import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : [["list"]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    /* Chromium is preinstalled in this environment. */
    launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined },
  },
  projects: [
    { name: "mobile", use: { ...devices["Pixel 7"] } },
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
  ],
  /* Tests run against a real production build, not the dev server. */
  webServer: {
    command: `pnpm build && pnpm start -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
