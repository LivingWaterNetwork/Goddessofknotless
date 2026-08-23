import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Gallery } from "@/components/ui/Gallery";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { gallery, galleryFilters, publishableGallery } from "@/content/gallery";
import { metadataForRoute } from "@/lib/page-metadata";

export const metadata: Metadata = metadataForRoute("/gallery");

export default function GalleryPage() {
  const hasReal = publishableGallery.length > 0;

  return (
    <>
      <PageHeader
        overline="Gallery"
        title="Esther's own work, and nothing else."
        lede={
          hasReal
            ? "Finished client work from the West Loop studio, filterable by size. Every image is Esther's own, published with the client's permission."
            : "This gallery will hold only Esther's own client work, published with permission. What you are looking at now is stock photography standing in so the page can be reviewed — none of it is hers, and all of it comes out before launch."
        }
      />

      <Section tone="ivory">
        <div className="container-page">
          <PlaceholderNotice className="gallery-notice" />
          <Gallery items={hasReal ? publishableGallery : gallery} filters={galleryFilters} />
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
