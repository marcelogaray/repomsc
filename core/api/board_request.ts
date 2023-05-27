import { Page } from 'playwright';
import BaseRequest from "./base_request";

export default class BoardRequest extends BaseRequest {

    constructor(page: Page) {
        super(page);
        this.endpoints.set("CREATE_BOARD", "/1/boards");
    }

    async createBoard(newTitle?:string): Promise<string>{
        await this.loadConfig();
        const title = newTitle? newTitle : await this.generateRandomName();
        let endpointValues = `?name=${title}&key=${this.key}&token=${this.token}`;
        await this.apiManager.post(`${this.baseUri}/${this.endpoints.get("CREATE_BOARD")}/${endpointValues}`);
        return title;
    }
}