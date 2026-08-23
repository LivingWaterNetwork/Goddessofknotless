import { primaryNav } from "@/content/navigation";
import { BookButton } from "@/components/ui/BookButton";
import { Wordmark } from "@/components/ui/Wordmark";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";

/**
 * Server component.
 *
 * The header used to be a client component in its entirety, which meant every
 * route hydrated the wordmark, the whole nav list, and the desktop CTA just so
 * the mobile toggle could hold open/closed state. Only three things actually
 * need the client: the mobile menu island, the active-route marker, and the
 * booking buttons (which track clicks).
 */
export function Header() {
  return (
    <header className="site-header">
      <div className="container-page site-header-inner">
        <Wordmark />

        <nav className="site-nav" aria-label="Main">
          <ul className="site-nav-list">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header-cta">
          <BookButton placement="header" label="Book" />
        </div>

        <MobileMenu items={primaryNav} />
      </div>
    </header>
  );
}
