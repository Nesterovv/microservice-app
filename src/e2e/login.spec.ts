import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import * as dotenv from "dotenv";

dotenv.config();

test.describe("Todo App login/logout", () => {
  let loginPage: LoginPage;
  const baseUrl = process.env.BASE_URL!;
  const username = process.env.USERNAME!;
  const password = process.env.PASSWORD!;

  test("should login successfully", async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateTo(baseUrl + "#/login");
    await loginPage.login(username, password);

    const isVisible = await loginPage.isMainPageVisible();

    expect(isVisible).toBe(true);
  });

  test("should logout successfully", async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateTo(baseUrl + "#/login");
    await loginPage.login(username, password);
    await loginPage.logout();
  });
});
