import {Page} from "@playwright/test";

export class UIManager {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitLocatorVisible(locator: string){
        await this.page.waitForSelector(locator, {state: "visible", timeout: 60000})
        await this.page.waitForSelector(locator, {state: "attached"});
    }

    async click(locator: string, timeout= 300){
        await this.waitLocatorVisible(locator);
        await this.page.locator(locator).first().click();
        await this.page.waitForTimeout(timeout);
    }

    async fill(locator: string, value:string, timeout=300){
        await this.waitLocatorVisible(locator);
        await this.page.locator(locator).fill(value);
    }

    async waitDefault(){
        await this.page.waitForLoadState("networkidle");
        await this.page.waitForLoadState("domcontentloaded");
    }

    async isElementVisible(elementLocator: string, timeout = 300): Promise<boolean> {
        await this.page.waitForTimeout(timeout);
        await this.waitDefault();
        const element = await this.page.locator(elementLocator);
        if (!element) {
            return false;
        }
        const isVisible = await element.isVisible();
        return isVisible;
    }
}