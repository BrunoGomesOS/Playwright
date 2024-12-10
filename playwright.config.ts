import { defineConfig, devices } from '@playwright/test';
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
export default defineConfig({
  // root folder from where the exports can be done
  testDir: './Playwright',

  /** It sets the global timeout for each test case to 5 minutes (300,000 milliseconds). 
  * This means that any single test will be allowed to run for up to 5 minutes before being forcefully terminated and marked as failed. 
  */
  timeout: 300000,

  /** Sets a global timeout for expect assertions in Playwright tests. 
  * This means any expect() statements in your tests will wait for up to 10 seconds for the condition to be fulfilled before throwing a timeout error.
  */
  expect: {
    timeout: 10000,
  },

  // Folder for test artifacts such as screenshots, videos, traces, etc.
  outputDir: 'test-results',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    //baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',

    /* Take a screenshot when test fails. */
    screenshot: 'only-on-failure',

    video: {
      mode: 'on-first-retry',
      size: {
        width: 1920,
        height: 1080,
      },
    },

  },


  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'Showcase Dev',
      use: { ...devices['Desktop Chrome'], 
        baseURL: 'https://showcase-dev.outsystemsdevopsexperts.com',
        // It is important to define the `viewport` property after destructuring `devices`,
        // since devices also define the `viewport` for that device.
      },
    },

    {
      name: 'Mobile Iphone 13',
      use: { ...devices['iPhone 13'], 
        // It is important to define the `viewport` property after destructuring `devices`,
        // since devices also define the `viewport` for that device.
        // viewport: { width: 1920, height: 1080 },
        isMobile: true,
      },
    },

  
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
