import {BasePage} from "./base_page"
import {Page} from "@playwright/test";
import {LoginPage} from "./login_page";

export class TrelloPage extends BasePage {
    pageUrl: string;

    constructor(page: Page) {
        super(page);
        this.locators.set("Log in", "header div a:not([tabindex='-1'])[href='/login']");
    }

    async goToLogin(): Promise<LoginPage> {
        await this.navigateToSite('/');
        await this.uiManager.click(this.locators.get("Log in"));
        return new LoginPage(this.page);
    }
}