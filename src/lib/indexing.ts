/**
 * Whether this deployment may be indexed by search engines.
 *
 * **Opt-in, deliberately.** Indexing is off unless NEXT_PUBLIC_ALLOW_INDEXING is
 * explicitly "true", which will only ever be set on the production deployment of
 * the real custom domain.
 *
 * Inferring this from VERCEL_ENV or the hostname was tried first and rejected:
 * every wrong guess fails in the dangerous direction. A review link that Google
 * crawls puts placeholder photography, unconfirmed prices, and disabled booking
 * buttons into search results, and then competes with the real site at launch.
 * Getting it wrong the other way costs one environment variable at launch.
 */
export const indexingAllowed: boolean = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
