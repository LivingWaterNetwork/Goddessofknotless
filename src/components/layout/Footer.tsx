import Image from "next/image";
import Link from "next/link";
import { business, originStatement } from "@/content/business";
import { footerNav } from "@/content/navigation";
import { PreviewBadge } from "@/components/ui/PreviewBadge";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer on-dark">
      <div className="container-page">
        <div className="site-footer-top">
          <div className="site-footer-brand">
            {/* The script mark gets room to breathe here, at a size its
                resolution supports. Alt is empty: the name follows in text. */}
            <Image
              src="/brand/logo-primary-on-emerald.png"
              alt=""
              width={1536}
              height={648}
              sizes="(min-width: 48rem) 20rem, 15rem"
              className="site-footer-logo"
            />
            <p className="t-body-sm t-muted measure-tight mt-6">{originStatement}</p>
          </div>

          <nav className="site-footer-nav" aria-label="Footer">
            <h2 className="t-label site-footer-heading">Explore</h2>
            <ul>
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="site-footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer-contact">
            <h2 className="t-label site-footer-heading">Studio</h2>
            <p className="t-body-sm">
              {business.neighborhood.value}
              <br />
              {business.city.value}, {business.state.value}
            </p>
            <p className="t-body-sm t-muted mt-3">By appointment</p>

            {/* Contact details are omitted rather than invented. In preview the
                badge says why; in production the launch gate blocks first. */}
            {!business.phone.value ? (
              <p className="mt-4">
                <PreviewBadge
                  status={business.phone.status}
                  note="Phone, email, hours, and street address all pending Esther's confirmation."
                />
              </p>
            ) : null}
          </div>
        </div>

        <div className="rule-gold site-footer-rule" />

        <div className="site-footer-bottom">
          <p className="t-body-sm t-muted">
            © {year} {business.name}. Founded by {business.founder}.
          </p>
          <p className="t-body-sm t-muted">{business.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
