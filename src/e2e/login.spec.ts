import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('Todo App login/logout', () => {

  let loginPage: LoginPage;
  const baseUrl = process.env.BASE_URL!;
  const username = process.env.USERNAME!;
  const password = process.env.PASSWORD!;

  test('should login successfully', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateTo(baseUrl + '#/login');
    await loginPage.login(username, password);

  const isVisible = await loginPage.isMainPageVisible();

  expect(isVisible).toBe(true);

  // await page.waitForTimeout(1000); // Wait for log to be processed

  // try {
  //   const logs = await loginPage.getLogs({ message: 'User logged in', user: username });
  //   expect(logs.length).toBeGreaterThan(0);

  //   const loginLog = logs.find(log => log.user === username && log.message.includes('User logged in'));
  //   expect(loginLog).toBeDefined();
  // } catch (error) {
  //   console.error('Error retrieving login logs:', error);
  //   throw error;
  // }
  });

  test('should logout successfully', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateTo(baseUrl + '#/login');
    await loginPage.login(username, password);
    await loginPage.logout();
  //   await page.waitForTimeout(1000); // Adjust as necessary

  //   try {
  //     const logs = await loginPage.getLogs({ message: 'User logged out', user: username });
  //     expect(logs.length).toBeGreaterThan(0);

  //     const logoutLog = logs.find(log => log.user === username && log.message.includes('User logged out'));
  //     expect(logoutLog).toBeDefined();
  //   } catch (error) {
  //     console.error('Error retrieving logout logs:', error);
  //     throw error;
  //   }
   });
});
