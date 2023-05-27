import { Page } from 'playwright';
import ApiManager from "./helper/api_manager";
import Credentials from "../manage_data/Credentials";

export default class BaseRequest {
    readonly page: Page;
    protected endpoints: Map<string, string>;
    protected apiManager: ApiManager;
    protected dataApi: string;
    protected baseUri: string;
    protected token: string;
    protected key: string;

    constructor(page: Page) {
        this.endpoints = new Map<string, string>();
        this.apiManager = new ApiManager(page);
        //this.init()
    }

    async loadConfig(){
        this.dataApi = await Credentials.getDataUser("api");
        this.baseUri = this.dataApi["baseuri"]
        this.token = this.dataApi["token"]
        this.key = this.dataApi["apiKey"]
    }

    async generateRandomName(maxLength = 25): Promise<string> {
        const prefix = 'BoardScript-';
        const timestamp = Date.now().toString();
        const randomName = prefix + timestamp;
        return randomName.slice(0, maxLength);
    }
}