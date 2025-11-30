import { defineConfig, devices } from '@playwright/test';

// Only load dotenv locally, NOT on CI
if (!process.env.CI) {
  const dotenv = await import('dotenv');
  dotenv.config();
}

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  
  use: {
    headless: process.env.CI ? true : false,
    navigationTimeout: 60000,
    actionTimeout: 10000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});