import express, { Request, Response } from "express";
import { ObjectId } from 'mongodb';
const routerCalendario = express.Router();
import { connect } from "../../services/db/mongoDB/db";


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

async function borrarRecordatorio(request: Request, response: Response) {
    try {
        const db = await connect();
        const collection = db.collection('Calendario');

        const { fechaInicio } = request.params;

        console.log(request.body);

        if (!fechaInicio) {
            response.status(400).send({ message: 'Fecha de inicio no proporcionada en el cuerpo de la solicitud.' });
            return;
        }

        const deleteResult = await collection.deleteOne({ fechaInicio: new Date(fechaInicio).toISOString() });

        if (deleteResult.deletedCount > 0) {
            response.status(200).send({ message: 'Recordatorio eliminado exitosamente.' });
        } else {
            response.status(404).send({ message: 'No se encontró un recordatorio con esa fecha de inicio.' });
        }
    } catch (error) {
        console.error('Error al eliminar el recordatorio:', error);
        response.status(500).send({ message: 'Error interno del servidor.' });
    }
}




routerCalendario.get('/', verCalendario)
routerCalendario.post('/', guardarFechas)
routerCalendario.delete('/:fechaInicio', borrarRecordatorio)


export default routerCalendario;
