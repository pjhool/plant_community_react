import { test, expect } from '@playwright/test';

test.describe('Comment System', () => {
  test('should allow a user to post a comment on a post', async ({ page }) => {
    // Navigate to a post detail page
    // We assume a post with ID 'test-post' exists or we find one from the feed
    await page.goto('/');
    await page.locator('.bg-card').first().click();
    
    // Check if we are on the post detail page
    await expect(page.locator('textarea[placeholder="Write a comment..."]')).toBeVisible();
    
    // Write and submit a comment
    const commentText = 'This is a test comment ' + Date.now();
    await page.locator('textarea[placeholder="Write a comment..."]').fill(commentText);
    await page.getByRole('button', { name: 'Post' }).click();
    
    // Verify the comment appears in the list
    await expect(page.getByText(commentText)).toBeVisible();
  });
});
