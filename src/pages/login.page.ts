import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
  private usernameField = '[name="username"]';
  private passwordField = '[name="password"]';
  private loginButton = 'button:has-text("Login")';
  private logoutButton = 'button.btn.btn-danger:has-text("Logout")';
  private mainPage = "div.container >> nth=-1";

  async login(username: string, password: string): Promise<void> {
    await this.typeIntoField(this.usernameField, username);
    await this.typeIntoField(this.passwordField, password);
    await this.clickElement(this.loginButton);
  }

  async isMainPageVisible(): Promise<boolean> {
    return await this.isElementVisible(this.mainPage);
  }

  async logout(): Promise<void> {
    await this.clickElement(this.logoutButton);
    await this.page.waitForSelector(this.usernameField, { state: "visible" });
    await this.page.waitForSelector(this.passwordField, { state: "visible" });
  }
}
