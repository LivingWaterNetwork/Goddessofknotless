import { features } from "./features";

export interface NavItem {
  href: string;
  label: string;
}

/**
 * The primary nav is deliberately NOT where the roadmap lives.
 *
 * Five items is what fits at 768px without wrapping, and every one of them
 * leads somewhere a visitor can act. Putting "Classes", "Shop" and "Events"
 * up here would spend the most valuable navigation on three pages that cannot
 * yet be bought, booked or joined — and would make an established studio read
 * as a business still deciding what it is. They live in the footer until they
 * are real, at which point they move up by changing one array.
 */
const base: NavItem[] = [
  { href: "/services", label: "Services" },
  { href: "/experience", label: "Experience" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export const primaryNav: NavItem[] = [
  ...base,
  ...(features.educationWaitlist ? [{ href: "/education", label: "Classes" }] : []),
];

/** Things that exist today. */
export const footerNav: NavItem[] = [
  ...base,
  ...(features.locations ? [{ href: "/locations", label: "Locations" }] : []),
  ...(features.team ? [{ href: "/team", label: "The Team" }] : []),
  { href: "/policies", label: "Policies" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

/**
 * Things that do not exist yet. Grouped and labelled as such in the footer, so
 * a visitor is never one click from a dead end they were not warned about.
 */
export const roadmapNav: NavItem[] = [
  ...(features.classes ? [{ href: "/classes", label: "Classes" }] : []),
  ...(features.shop ? [{ href: "/shop", label: "Shop" }] : []),
  ...(features.events ? [{ href: "/events", label: "Events" }] : []),
];
