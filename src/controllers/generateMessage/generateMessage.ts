import express, { Request, Response } from "express";
import { MistralService } from "../../services/mistral";

const mistralInstance = new MistralService();
const routerIA = express.Router();


async function getNewCompletion(request: Request, response: Response) {
    const { messages } = request.body;
    const newCompletion = await mistralInstance.getCompletation(messages);
    const newMessages = messages.slice().concat({
        role: "assistant",
        content: newCompletion
    });
    response.send(newMessages);
}

routerIA.post('/completion', getNewCompletion)

export default routerIA
