import { AxiosClient } from './axios'

class MistralService extends AxiosClient {

    constructor () {
        super("https://api.mistral.ai");
    }

    async getCompletation(messages: any) {
        const result = await this.client.post("/v1/chat/completions", {
            model: "ministral-3b-2410",
            temperature: "0",
            messages
        });
        return result.data.choices[0].message.content;
    }

}

export { MistralService }