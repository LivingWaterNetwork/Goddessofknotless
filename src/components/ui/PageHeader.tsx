import Link from "next/link";
import type { ReactNode } from "react";
import { Frond } from "./Frond";

export interface Crumb {
  name: string;
  path: string;
}

export interface HeaderFigure {
  label: string;
  value: string;
}

/**
 * Shared page masthead. Breadcrumbs appear only on routes deeper than one
 * level, where they actually help orientation.
 *
 * `figures` sets two or three facts as numerals at display scale. Used where
 * the page has a number worth making graphic — the price floor, the size
 * count — rather than on every route.
 */
export function PageHeader({
  overline,
  title,
  lede,
  crumbs,
  meta,
  figures,
}: {
  overline: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs?: Crumb[];
  meta?: ReactNode;
  figures?: HeaderFigure[];
}) {
  return (
    <header className="page-header on-dark">
      <span className="page-header-frond" aria-hidden="true">
        <Frond />
      </span>

      <div className="container-page page-header-inner">
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
        <div className="rule-foil page-header-rule" />
        {lede ? <p className="page-header-lede t-body-lg">{lede}</p> : null}

        {figures && figures.length > 0 ? (
          <dl className="page-header-figures t-nums">
            {figures.map((figure) => (
              <div key={figure.label}>
                <dt className="t-label">{figure.label}</dt>
                <dd>{figure.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {meta ? <div className="page-header-meta">{meta}</div> : null}
      </div>
    </header>
  );
}
