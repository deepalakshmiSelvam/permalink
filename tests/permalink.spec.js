import { test, expect } from '@playwright/test';

test('WordPress Permalink Settings Test', async ({ page }) => {
  const username = process.env.WP_USERNAME;
  const password = process.env.WP_PASSWORD;
  
  console.log('Username exists:', !!username);
  console.log('Password exists:', !!password);
  
  // Login page
  await page.goto('https://digitalsanskrit.com/wp-login.php', {
    timeout: 60000,
    waitUntil: 'domcontentloaded'
  });
  
  // Fill login credentials
  await page.getByRole('textbox', { name: 'Username or Email Address' })
    .fill(username);
  await page.getByRole('textbox', { name: 'Password' })
    .fill(password);
  
  // Click login button
  await page.getByRole('button', { name: 'Log In' }).click();
  
  // Wait for navigation and check if login was successful
  await page.waitForLoadState('networkidle');
  
  // Check if we're logged in (should redirect to admin)
  const currentUrl = page.url();
  console.log('Current URL after login:', currentUrl);
  
  // If login failed, take screenshot for debugging
  if (!currentUrl.includes('wp-admin')) {
    await page.screenshot({ path: 'test-results/login-failed.png' });
    throw new Error('Login failed - not redirected to wp-admin');
  }
  
  // Navigate to Permalinks settings
  await page.locator('#menu-settings > .wp-has-submenu').click();
  await page.getByRole('link', { name: 'Permalinks' }).click();
  
  // Wait for page to load
  await page.waitForLoadState('domcontentloaded');
  
  // Save changes
  await page.getByRole('button', { name: 'Save Changes' }).click();
  
  // Verify success
  await expect(page.locator('.updated, .notice-success')).toBeVisible({ timeout: 10000 });
  
  console.log('Test completed successfully!');
});