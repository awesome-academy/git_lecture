import { test, expect } from '@playwright/test';

const baseURL = 'https://www.saucedemo.com/';

test.describe('Login Page Tests', () => {
    test('should login successfully with valid credentials', async ({ page }) => {
        await page.goto(baseURL);
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await expect(page).toHaveURL(/inventory.html/);
        await expect(page.locator('.inventory_list')).toBeVisible();
    });


    test('Login fails with invalid password', async ({ page }) => {
        await page.goto(baseURL);
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'wrong_password');
        await page.click('[data-test="login-button"]');
        await expect(page.locator('[data-test="error"]')).toHaveText(/Username and password do not match/);
    });


    test('Login fails with locked out user', async ({ page }) => {
        await page.goto(baseURL);
        await page.fill('[data-test="username"]', 'locked_out_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');
        await expect(page.locator('[data-test="error"]')).toHaveText(/Sorry, this user has been locked out/);
    });
});
