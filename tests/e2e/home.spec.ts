import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the home page with correct title and elements', async ({ page }) => {
    // Check main title
    await expect(page.getByText('Plant Community')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Discover your neighborhood gardeners' })).toBeVisible();
    
    // Check header buttons
    await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create Post' })).toBeVisible();
  });

  test('should navigate to create post page when clicking Create Post button', async ({ page }) => {
    await page.getByRole('button', { name: 'Create Post' }).click();
    await expect(page).toHaveURL(/\/posts\/create/);
  });
});
