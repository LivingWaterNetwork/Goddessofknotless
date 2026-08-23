import { features } from "./features";

export interface NavItem {
  href: string;
  label: string;
}

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

export const footerNav: NavItem[] = [
  ...base,
  { href: "/policies", label: "Policies" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];
