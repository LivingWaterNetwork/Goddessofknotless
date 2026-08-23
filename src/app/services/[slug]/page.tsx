import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { PreviewBadge } from "@/components/ui/PreviewBadge";
import { BookButton } from "@/components/ui/BookButton";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { getService, services, servicesByOrder, addOns } from "@/content/services";
import { durationRange, priceRange, usd } from "@/lib/format";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/structured-data";
import { defaultSeo } from "@/content/seo";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const title = `${service.name} Knotless Braids`;
  const description = `${service.summary} ${priceRange(service.price.fromUsd, service.price.toUsd)}, ${durationRange(service.duration.fromHours, service.duration.toHours)} in the chair, at Goddess of Knotless in Chicago's West Loop.`;

  return {
    title,
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: `${title} · ${defaultSeo.siteName}`, description, url: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const index = servicesByOrder.findIndex((s) => s.slug === service.slug);
  const previous = index > 0 ? servicesByOrder[index - 1] : undefined;
  const next = index < servicesByOrder.length - 1 ? servicesByOrder[index + 1] : undefined;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ];

  const relevantAddOns = addOns.filter(
    (a) => a.priceUsd !== undefined || a.priceBySlug?.[service.slug] !== undefined,
  );

  return (
    <>
      <PageHeader
        overline={service.braidCount ? `${service.name} · ${service.braidCount}` : service.name}
        title={service.tagline}
        lede={service.summary}
        crumbs={crumbs}
        meta={
          <dl className="detail-stats t-nums">
            <div>
              <dt className="t-label">Price range</dt>
              <dd>{priceRange(service.price.fromUsd, service.price.toUsd)}</dd>
            </div>
            <div>
              <dt className="t-label">Appointment</dt>
              <dd>{durationRange(service.duration.fromHours, service.duration.toHours)}</dd>
            </div>
            <div>
              <dt className="t-label">Boho finish</dt>
              <dd>
                {service.bohoSurchargeUsd !== null
                  ? `+${usd(service.bohoSurchargeUsd)}`
                  : "By request"}
              </dd>
            </div>
          </dl>
        }
      />

      <Section tone="ivory">
        <div className="container-page detail-inner">
          <div className="detail-copy">
            {service.status !== "verified" ? (
              <p className="detail-flag">
                <PreviewBadge status={service.status} note={service.sourceNote} />
              </p>
            ) : null}

            <h2 className="t-h3">About this size</h2>
            <div className="prose-body t-body t-muted measure detail-body">
              <p>{service.detail}</p>
              <p>
                Your final price depends on length. The bottom of the range is shoulder length;
                the top is ankle. Esther confirms the exact figure when your appointment is
                booked, together with any add-ons.
              </p>
            </div>

            <h3 className="t-h4 detail-subhead">This size suits</h3>
            <ul className="detail-list">
              {service.suitedFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className="t-h4 detail-subhead">Before you arrive</h3>
            <div className="prose-body t-body t-muted measure">
              <p>
                Come with your hair washed and blow-dried. The appointment is the braiding
                itself, so arriving prepped is what keeps the {durationRange(service.duration.fromHours, service.duration.toHours)}{" "}
                window accurate. Well blow-dried hair also parts more cleanly, which shows in the
                finished result.
              </p>
            </div>

            <h3 className="t-h4 detail-subhead">Add-ons for this size</h3>
            <dl className="addons detail-addons">
              {relevantAddOns.map((addOn) => {
                const perSize = addOn.priceBySlug?.[service.slug];
                const price =
                  perSize !== undefined
                    ? `+${usd(perSize)}`
                    : addOn.priceUsd !== undefined
                      ? `${usd(addOn.priceUsd)}${addOn.unit ? ` ${addOn.unit}` : ""}`
                      : "By request";
                return (
                  <div key={addOn.id} className="addon">
                    <dt>
                      {addOn.name}
                      <span className="addon-price t-nums">{price}</span>
                    </dt>
                    <dd className="t-body-sm t-muted">{addOn.description}</dd>
                  </div>
                );
              })}
            </dl>

            <div className="detail-cta">
              <BookButton placement="service-detail" size="lg" serviceSlug={service.slug} />
            </div>

            <nav className="detail-nav" aria-label="Other sizes">
              {previous ? (
                <Link href={`/services/${previous.slug}`} className="detail-nav-link">
                  <span className="t-label">Larger</span>
                  {previous.name}
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={`/services/${next.slug}`} className="detail-nav-link detail-nav-next">
                  <span className="t-label">Finer</span>
                  {next.name}
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </div>

          <aside className="detail-media" aria-label="Reference image">
            <ImageFrame
              src={null}
              alt=""
              width={1000}
              height={1300}
              status="placeholder"
              tone="emerald"
              label={`${service.name} — finished result reference`}
              note={`Awaiting a real ${service.name} result photograph. See docs/PHOTO_SHOOT_BRIEF.md.`}
              sizes="(min-width: 64rem) 32vw, 100vw"
            />
          </aside>
        </div>
      </Section>

      <ClosingCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(service.slug)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }}
      />
    </>
  );
}
