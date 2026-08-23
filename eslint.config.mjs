import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * Flat config for ESLint 9.
 *
 * This file used to exist only on the machine that built the site: the
 * `/*.mjs` rule in .gitignore — meant for local QA scratch scripts — silently
 * swallowed it, so `pnpm lint`, and therefore the whole `pnpm qa` chain,
 * failed on a fresh clone. It is now explicitly un-ignored there.
 */
const config = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
      "next-env.d.ts",
    ],
  },
  ...coreWebVitals,
  ...typescript,
];

export default config;
