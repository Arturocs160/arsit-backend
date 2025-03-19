import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

class AxiosClient {
    client;

    constructor (baseURL: string) {
        this.client = axios.create({
            baseURL,
            headers: {
                "Authorization": `Bearer ${process.env.API_KEY_MISTRAL}`
            }
        })
    }

}

export { AxiosClient };