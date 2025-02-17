import express, { Request, Response } from "express";
import { ObjectId } from 'mongodb';
const routerInvernaderos = express.Router();
import { connect } from "../../../db/db";

async function verInvernaderos(request: Request, response: Response) {
    const db = await connect();
    const collection = db.collection('Invernadero');

    const invernaderos = await collection.find().toArray();
    response.send(invernaderos);

}


routerInvernaderos.get('/', verInvernaderos);

export default routerInvernaderos
