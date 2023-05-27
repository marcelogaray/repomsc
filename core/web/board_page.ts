import {BasePage} from "./base_page"
import {Page} from "@playwright/test";


export class BoardPage extends BasePage {
    pageUrl: string;

    constructor(page: Page) {
        super(page);
        this.locators.set("Create new board", "div.board-tile p span");
        this.locators.set("Board title", "input[data-testid='create-board-title-input']");
        this.locators.set("Create button", "button[data-testid='create-board-submit-button']");
        this.locators.set("Board Title dashboard", `//li//*[@class='board-tile-details-name']/div[text()='<replaceme>']`);
        this.locators.set("Board Title SideBar", `//ul[@data-testid='collapsible-list-items']//a[text()='<replaceme>']`);
    }

    async createNewBoard(newTitle?:string){
        const title = newTitle? newTitle : await this.generateRandomName();
        await this.uiManager.click(this.locators.get("Create new board"));
        await this.uiManager.fill(this.locators.get("Board title"), title);
        await this.uiManager.click(this.locators.get("Create button"));
        await this.uiManager.waitDefault();
        return title;
    }

    async isTitleBoardSideBarVisible(titleBoard: string) {
        let locatorDynamic = await this.replaceValueInLocator("Board Title SideBar", titleBoard);
        return await this.uiManager.isElementVisible(locatorDynamic);
    }

    async isTitleBoardDasboardVisible(titleBoard: string) {
        let locatorDynamic = await this.replaceValueInLocator("Board Title dashboard", titleBoard);
        return await this.uiManager.isElementVisible(locatorDynamic);
    }
}