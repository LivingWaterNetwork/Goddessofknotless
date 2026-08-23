import Link from "next/link";
import type { ReactNode } from "react";

export interface Crumb {
  name: string;
  path: string;
}

/**
 * Shared page masthead. Breadcrumbs appear only on routes deeper than one
 * level, where they actually help orientation.
 */
export function PageHeader({
  overline,
  title,
  lede,
  crumbs,
  meta,
}: {
  overline: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs?: Crumb[];
  meta?: ReactNode;
}) {
  return (
    <header className="page-header on-dark">
      <div className="container-page">
        {crumbs && crumbs.length > 1 ? (
          <nav aria-label="Breadcrumb" className="breadcrumbs">
            <ol>
              {crumbs.map((crumb, index) => {
                const last = index === crumbs.length - 1;
                return (
                  <li key={crumb.path}>
                    {last ? (
                      <span aria-current="page">{crumb.name}</span>
                    ) : (
                      <>
                        <Link href={crumb.path}>{crumb.name}</Link>
                        <span aria-hidden="true" className="breadcrumb-sep">
                          /
                        </span>
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}

        <p className="overline">{overline}</p>
        <h1 className="t-h1 page-header-title">{title}</h1>
        {lede ? <p className="page-header-lede t-body-lg">{lede}</p> : null}
        {meta ? <div className="page-header-meta">{meta}</div> : null}
      </div>
    </header>
  );
}
