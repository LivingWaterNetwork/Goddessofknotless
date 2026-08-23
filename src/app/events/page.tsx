import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OfferingPage } from "@/components/sections/OfferingPage";
import { features } from "@/content/features";
import { metadataForRoute } from "@/lib/page-metadata";

export const metadata: Metadata = metadataForRoute("/events");

export default function Page() {
  if (!features.events) notFound();
  return <OfferingPage id="events" />;
}
