import { test, expect } from '@playwright/test';
import seedData from './fixtures/seed.json';

test.describe('Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    // 1. Login first
    await page.goto('/login');
    const user = seedData.users[0];
    await page.getByPlaceholder('your@email.com').fill(user.email);
    await page.getByPlaceholder('••••••').fill(user.password);
    await page.getByRole('button', { name: 'Log In' }).click();
    
    // Wait for redirection to home or onboarding
    await page.waitForURL(url => url.pathname === '/' || url.pathname === '/onboarding/setup');
    
    // 2. Go to onboarding if not already there
    if (page.url().endsWith('/')) {
      await page.goto('/onboarding/setup');
    }
  });

  test('should complete the onboarding flow successfully', async ({ page }) => {
    // Step 1: Residence
    await expect(page.getByText('어디에서 식물을 키우시나요?')).toBeVisible();
    await page.getByText('아파트', { exact: true }).click();
    await page.getByRole('button', { name: '다음' }).click();

    // Step 2: Light
    await expect(page.getByText('빛이 어느 정도 들어오나요?')).toBeVisible();
    await page.getByText('남향', { exact: true }).click();
    await page.getByRole('button', { name: '다음' }).click();

    // Step 3: Experience
    await expect(page.getByText('식물 키우기 실력은 어느 정도인가요?')).toBeVisible();
    await page.getByText('초보', { exact: true }).click();
    await page.getByRole('button', { name: '완료' }).click();

    // Final Step: Summary
    await expect(page).toHaveURL(/\/onboarding\/summary/);
    await expect(page.getByText('환경 분석 결과')).toBeVisible();
  });

  test('should disable Next button if required field is not selected', async ({ page }) => {
    const nextButton = page.getByRole('button', { name: '다음' });
    await expect(nextButton).toBeDisabled();
    
    await page.getByText('아파트', { exact: true }).click();
    await expect(nextButton).toBeEnabled();
  });
});
