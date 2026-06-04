import { test, expect } from '@playwright/test';

test.describe('Post Creation Flow', () => {
  test.beforeEach(async ({ page }) => {
    // In a real app, we would authenticate here
    await page.goto('/posts/create/type');
  });

  test('should navigate through all steps and publish a post', async ({ page }) => {
    // Step 1: Type Selection
    await expect(page.getByText('What kind of post is this?')).toBeVisible();
    await page.getByText('General Update').click();
    await page.getByRole('button', { name: 'Next Step' }).click();

    // Step 2: Environment Lock
    await expect(page.getByText('Snapshot your environment')).toBeVisible();
    // Assuming profile exists or mock it
    await page.getByRole('button', { name: 'Confirm & Next' }).click();

    // Step 3: Plant Info
    await expect(page.getByText('Which plant is this about?')).toBeVisible();
    await page.getByPlaceholder('e.g., My favorite Monstera').fill('Test Plant');
    await page.getByRole('button', { name: 'Continue' }).click();

    // Step 4: Description
    await expect(page.getByText('Tell us the story')).toBeVisible();
    await page.getByPlaceholder('e.g., My Monstera has yellow leaves').fill('Test Title');
    await page.getByPlaceholder('Describe the situation in detail...').fill('This is a test description that is long enough.');
    await page.getByRole('button', { name: 'Review Post' }).click();

    // Step 5: Summary & Image
    await expect(page.getByText('Review and Publish')).toBeVisible();
    await expect(page.getByText('Test Plant')).toBeVisible();
    await expect(page.getByText('Test Title')).toBeVisible();
    
    // We skip actual file upload in this test case draft, but verify the button exists
    await expect(page.getByRole('button', { name: 'Publish Post' })).toBeVisible();
    
    // Final step would be clicking publish and expecting success
    // await page.getByRole('button', { name: 'Publish Post' }).click();
    // await expect(page.getByText('Published Successfully!')).toBeVisible();
  });
});
