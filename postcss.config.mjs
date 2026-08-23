/**
 * Tailwind CSS v4 runs as a PostCSS plugin.
 *
 * This file was missing from the repository: the `/*.mjs` rule in .gitignore,
 * added for local QA scratch scripts, swallowed it. Without it nothing
 * processed `@theme` or `@utility`, so the built stylesheet shipped `@theme`
 * verbatim — no `:root` block, every `var(--color-*)` resolving to nothing,
 * and `@utility container-page` emitted as a bogus `container-page` type
 * selector. The deployed site had no palette and no page container.
 *
 * It is explicitly un-ignored in .gitignore now.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
