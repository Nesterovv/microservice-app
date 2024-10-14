import { PlaywrightTestConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';


dotenv.config();
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './src/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: true,
    baseURL: process.env.BASE_URL,
    screenshot: 'on',
  video: 'on',
    trace: 'retain-on-failure',
  },

  projects: [
    {
        name: 'chromium',
        use: { browserName: 'chromium' },
    },
    {
        name: 'firefox',
        use: { browserName: 'firefox' },
    },
    {
        name: 'webkit',
        use: { browserName: 'webkit' },
    },
  ],
};

export default config;
