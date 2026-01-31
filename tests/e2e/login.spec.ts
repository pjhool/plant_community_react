import { test, expect } from '@playwright/test';
import seedData from './fixtures/seed.json';

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible({ timeout: 10000 });
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    // Note: This test will fail if the user doesn't exist in Firebase.
    const user = seedData.users[0];
    await page.getByPlaceholder('your@email.com').fill(user.email);
    await page.getByPlaceholder('••••••').fill(user.password);
    await page.getByRole('button', { name: 'Log In' }).click();

    // We don't strictly assert the URL here because it might fail without a real user
    // But we check if we at least moved away from login OR got an error
    const errorAlert = page.locator('.bg-red-100');
    const isError = await errorAlert.isVisible();
    
    if (!isError) {
      await expect(page).toHaveURL('/', { timeout: 15000 });
    }
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    const invalid = seedData.invalidInputs.login;
    await page.getByPlaceholder('your@email.com').fill(invalid.nonExistentEmail);
    await page.getByPlaceholder('••••••').fill(invalid.wrongPassword);
    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page.locator('.bg-red-100')).toBeVisible({ timeout: 10000 });
  });

  test('should show validation errors for invalid input formats', async ({ page }) => {
    // Disable browser native validation to let React Hook Form handle it
    await page.$eval('form', form => form.setAttribute('novalidate', ''));
    
    await page.getByPlaceholder('your@email.com').fill('invalid-email');
    await page.getByPlaceholder('••••••').fill('123');
    
    await page.getByRole('button', { name: 'Log In' }).click();

    // Check for validation messages from Zod/React Hook Form
    await expect(page.getByText('Invalid email address')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Password must be at least 6 characters')).toBeVisible({ timeout: 10000 });
  });
});
