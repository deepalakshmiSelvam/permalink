import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://digitalsanskrit.com/wp-login.php', {
    timeout: 60000,
    waitUntil: 'domcontentloaded'
  });
  
  // Use environment variables instead of hardcoded credentials
  await page.getByRole('textbox', { name: 'Username or Email Address' })
    .fill(process.env.WP_USERNAME);
  await page.getByRole('textbox', { name: 'Password' })
    .fill(process.env.WP_PASSWORD);
  await page.getByRole('button', { name: 'Show password' }).click();
  await page.getByRole('button', { name: 'Log In' }).click();
  
  await page.goto('https://digitalsanskrit.com/wp-admin/', {
    timeout: 60000,
    waitUntil: 'domcontentloaded'
  });
  
  await page.locator('#menu-settings > .wp-has-submenu').click();
  await page.getByRole('link', { name: 'Permalinks' }).click();
  await page.getByRole('button', { name: 'Save Changes' }).click();
});