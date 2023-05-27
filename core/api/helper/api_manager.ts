import { Page, Request } from "playwright";

export default class ApiManager {
    private readonly page: Page;
    private headers;

    constructor(page: Page) {
        this.page = page;
        this.headers = { 'Content-Type': 'application/json' }
    }

    async get(endpoint: string): Promise<any> {
        return this.makeRequest('GET', endpoint);
    }

    async post(endpoint: string, data?: any): Promise<any> {
        return this.makeRequest('POST', endpoint, data);
    }

    async delete(endpoint: string): Promise<any> {
        return this.makeRequest('DELETE', endpoint);
    }

    private async makeRequest(method: string, endpoint: string, data?: any): Promise<any> {
        const requestOptions: Request = {
            method: method,
            url: endpoint,
            headers: this.headers,
            body: data ? JSON.stringify(data) : undefined,
        };

        const response = await this.page.evaluate(async (request) => {
            const fetchResponse = await fetch(request.url, {
                method: request.method,
                headers: request.headers,
                body: request.body,
            });

            const responseText = await fetchResponse.text();
            return { status: fetchResponse.status, body: responseText };
        }, requestOptions);

        if (response.status === 200) {
            return JSON.parse(response.body);
        } else {
            throw new Error(`Failed to make ${method} request to ${endpoint}`);
        }
    }
}
