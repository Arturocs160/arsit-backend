import axios from "axios";

class AxiosClient {
    client;

    constructor (baseURL: string) {
        this.client = axios.create({
            baseURL,
            headers: {
                "Authorization": `${process.env.API_KEY_MISTRAL}`
            }
        })
    }

}

export { AxiosClient };