import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    
    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async waitForElement(selector: string): Promise<void> {
        await this.page.waitForSelector(selector);
    }

    async clickElement(selector: string): Promise<void> {
        await this.page.click(selector);
    }

    async typeIntoField(selector: string, text: string): Promise<void> {
        await this.page.fill(selector, text);
    }
    async isElementVisible(selector: string): Promise<boolean> {
        const element = this.page.locator(selector);
        const isVisible = await element.isVisible();
        return isVisible;
      }
}
