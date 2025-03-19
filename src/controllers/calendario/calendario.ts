import express, { Request, Response } from "express";
import { ObjectId } from 'mongodb';
const routerCalendario = express.Router();
import { connect } from "../../../db/db";


async function verCalendario(request: Request, response: Response) {

    const db = await connect();
    const collection = db.collection('Calendario');

    const fechas = await collection.find().toArray();
    response.send(fechas);
    
}

async function guardarFechas(request: Request, response: Response) {
    const db = await connect();
    const collection = db.collection('Calendario');

    const { fechaInicio, fechaFinal, nota } = request.body;


    const fechaInicioDate = new Date(fechaInicio).toISOString(); 
    const fechaFinalDate = fechaFinal ? new Date(fechaFinal).toISOString() : fechaInicioDate;


    const insertResult = await collection.insertOne({
        fechaInicio: fechaInicioDate,
        fechaFinal: fechaFinalDate,
        nota: nota
    });

    response.send(insertResult);
}


routerCalendario.get('/', verCalendario)
routerCalendario.post('/', guardarFechas)


export default routerCalendario;
