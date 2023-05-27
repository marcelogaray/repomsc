import {Page} from "@playwright/test";
import {UIManager} from "./helper/ui_manager";

export class BasePage {
    readonly page: Page;
    readonly uiManager: UIManager;
    locators: Map<string, string>;

    constructor(page: Page) {
        this.locators = new Map<string, string>();
        this.page = page;
        this.uiManager = new UIManager(page);
    }

    async navigateToSite(siteUrl: string) {
        await this.page.goto(siteUrl);
        await this.uiManager.waitDefault();
    }

    async generateRandomName(maxLength = 25): Promise<string> {
        const prefix = 'Board Script - ';
        const timestamp = Date.now().toString();
        const randomName = prefix + timestamp;
        return randomName.slice(0, maxLength);
    }

    async replaceValueInLocator(key: string, replacement: string): Promise<string> {
        if (this.locators.has(key)) {
            const currentValue = this.locators.get(key);
            const newValue = currentValue.replace("<replaceme>", replacement);
            this.locators.set(key, newValue);
        }
        return this.locators.get(key);
    }
}