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

    test('should show error with invalid password', async ({ page }) => {
        await page.goto(baseURL);
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'wrong_password');
        await page.click('#login-button');
        await expect(page.locator('[data-test="error"]')).toHaveText(/Username and password do not match/);
    });

    test('should show error when username is empty', async ({ page }) => {
        await page.goto(baseURL);
        await page.fill('#user-name', '');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await expect(page.locator('[data-test="error"]')).toHaveText(/Username is required/);
    });
});