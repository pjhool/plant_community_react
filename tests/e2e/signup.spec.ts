import { test, expect } from '@playwright/test';

test.describe('Signup Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signup');
    // Wait for the form to be visible
    await expect(page.getByRole('heading', { name: 'Create an Account' })).toBeVisible({ timeout: 10000 });
  });

  test('should show validation errors for invalid input', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign Up' }).click();

    await expect(page.getByText('Invalid email address')).toBeVisible();
    await expect(page.getByText('Display name must be at least 2 characters')).toBeVisible();
    // Fix: resolved to 2 elements (password and confirm password error messages are same)
    await expect(page.getByText('Password must be at least 6 characters').first()).toBeVisible();
  });

  test('should show error if passwords do not match', async ({ page }) => {
    await page.getByPlaceholder('your@email.com').fill('test@example.com');
    await page.getByPlaceholder('Nickname').fill('Tester');
    await page.getByLabel('Password', { exact: true }).fill('password123');
    await page.getByLabel('Confirm Password').fill('password456');
    await page.getByRole('button', { name: 'Sign Up' }).click();

    await expect(page.getByText('Passwords do not match')).toBeVisible();
  });

  test('should navigate to login page from signup page', async ({ page }) => {
    await page.getByRole('link', { name: 'Log in' }).click();
    await expect(page).toHaveURL(/\/login/);
  });
});
