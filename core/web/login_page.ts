import {BasePage} from "./base_page"
import {Page} from "@playwright/test";
import Credentials from "../manage_data/Credentials";
import {BoardPage} from "./board_page";

export class LoginPage extends BasePage {
    pageUrl: string;

    constructor(page: Page) {
        super(page);
        this.locators.set("Enter email", "#user");
        this.locators.set("Enter password", "#password");
        this.locators.set("Continue", "#login");
        this.locators.set("Log in", "#login-submit");
    }

    async loginUserByDefault(): Promise<BoardPage> {
        let dataUser = await Credentials.getDataUser();
        await this.uiManager.fill(this.locators.get("Enter email"), dataUser['username']);
        await this.uiManager.click(this.locators.get("Continue"));
        await this.uiManager.fill(this.locators.get("Enter password"), dataUser['password']);
        await this.uiManager.click(this.locators.get("Log in"));
        return new BoardPage(this.page);
    }
}