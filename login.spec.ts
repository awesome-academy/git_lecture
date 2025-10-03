import { test, expect } from '@playwright/test';

const baseURL = 'https://www.saucedemo.com/';

test.describe('SauceDemo Login Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(baseURL);
    });

    test('should login successfully with performance_glitch_user', async ({ page }) => {
        await page.fill('[data-test="username"]', 'performance_glitch_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');
        await expect(page).toHaveURL(/inventory.html/);
    });

    test('should show error when username and password are empty', async ({ page }) => {
        await page.click('[data-test="login-button"]');
        await expect(page.locator('[data-test="error"]')).toHaveText(/Username is required/);
    });

    test('should show error when password is empty', async ({ page }) => {
        await page.fill('[data-test="username"]', 'standard_user');
        await page.click('[data-test="login-button"]');
        await expect(page.locator('[data-test="error"]')).toHaveText(/Password is required/);
    });

    test('should show error when username is empty', async ({ page }) => {
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');
        await expect(page.locator('[data-test="error"]')).toHaveText(/Username is required/);
    });

    test('should show error for invalid credentials', async ({ page }) => {
        await page.fill('[data-test="username"]', 'invalid_user');
        await page.fill('[data-test="password"]', 'invalid_pass');
        await page.click('[data-test="login-button"]');
        await expect(page.locator('[data-test="error"]')).toHaveText(/Username and password do not match/);
    });

    test('should login successfully with standard_user', async ({ page }) => {
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');
        await expect(page).toHaveURL(/inventory.html/);
        await expect(page.locator('.inventory_list')).toBeVisible();
    });

    test('should show error for locked_out_user', async ({ page }) => {
        await page.fill('[data-test="username"]', 'locked_out_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');
        await expect(page.locator('[data-test="error"]')).toHaveText(/Sorry, this user has been locked out/);
    });

    test('should login successfully with problem_user', async ({ page }) => {
        await page.fill('[data-test="username"]', 'problem_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');
        await expect(page).toHaveURL(/inventory.html/);
    });

});
