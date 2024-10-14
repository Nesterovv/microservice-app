import { BasePage } from './base.page';
import axios from 'axios';

export class LoginPage extends BasePage {
    // Define the locators for the login page
    private usernameField = '[name="username"]';
    private passwordField = '[name="password"]';
    private loginButton = 'button:has-text("Login")';
    private logoutButton = 'button.btn.btn-danger:has-text("Logout")';
    private mainPage = 'div.container >> nth=-1';


    // Method to log in with given credentials
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
        await this.page.waitForSelector(this.usernameField, { state: 'visible' });
        await this.page.waitForSelector(this.passwordField, { state: 'visible' });
      }

    //   async getLogs(filter: { message?: string; level?: string; user?: string }): Promise<any[]> {
    //     try {
    //       const logServiceUrl = process.env.LOG_SERVICE_URL!;
    //       const response = await axios.get(`${logServiceUrl}/logs`, {
    //         params: filter,
    //         headers: {
    //           'Authorization': `Bearer ${process.env.API_TOKEN}`,
    //         },
    //       });
    //       return response.data;
    //     } catch (error) {
    //       console.error('Error retrieving logs:', error);
    //       throw error;
    //     }
    //   }
}
