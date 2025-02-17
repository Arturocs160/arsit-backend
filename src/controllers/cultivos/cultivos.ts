import express, { Request, Response } from "express";
import { ObjectId } from 'mongodb';
const routerCultivos = express.Router();
import { connect } from "../../../db/db";


async function agregarCultivo(request: Request, response: Response) {
    const db = await connect();
    const collection = db.collection('Cultivos');
    
    
    const { cultivoId, cultivo, invernaderoId, fecha_siembra, notasId, nota, temperaturaMin, temperaturaMax, humedadMin, humedadMax } = request.body;

    const insertResult = await collection.insertOne( {
        cultivoId: cultivoId,
        cultivo: cultivo, 
        invernaderoId: invernaderoId, 
        fecha_siembra: fecha_siembra, 
        nota: nota,
        parametros_optimos: {
            temperatura: {min: temperaturaMin, max: temperaturaMax}, 
            humedad:{min: humedadMin, max: humedadMax}
        }
    } );

    // console.log('Inserted document =>', insertResult);

    response.send(insertResult);
}

async function verCultivos(request: Request, response: Response) {
    const db = await connect();
    const collection = db.collection('Cultivos');
    
    const { invernaderoId } = request.query;

    // console.log(invernaderoId)

    const filteredDocs = await collection.find({ invernaderoId: invernaderoId }).toArray();

    // console.log(filteredDocs)

    response.send(filteredDocs);
}

async function borrarCultivo(request: Request, response: Response) {
    const db = await connect();
    const collection = db.collection('Cultivos');

    const { cultivoId } = request.params;

    const deleteResult = await collection.deleteOne({ _id: new ObjectId(cultivoId) });
    // console.log('Deleted documents =>', deleteResult);

    response.send(deleteResult);
}

async function actualizarCultivo(request: Request, response: Response) {
    const db = await connect();
    const collection = db.collection('Cultivos');
    
    const { cultivoId, cultivo, invernaderoId, fecha_siembra, notasId, nota, temperaturaMin, temperaturaMax, humedadMin, humedadMax } = request.body;
    
    const filtro = { _id: new ObjectId(cultivoId) };

    const updateResult = await collection.updateOne(
        filtro,
        {
            $set: {
                cultivo: cultivo, 
                invernaderoId: invernaderoId, 
                nota: nota,
                parametros_optimos: {
                    temperatura: {min: temperaturaMin, max: temperaturaMax}, 
                    humedad: {min: humedadMin, max: humedadMax}
                }
            }
        }
    );

    // console.log('Updated document =>', updateResult);

    response.send(updateResult);
}

async function verCultivo(request: Request, response: Response) {
    const db = await connect();
    const collection = db.collection('Cultivos');

    const { cultivoId } = request.params;

    const cultivo = await collection.findOne({ _id: new ObjectId(cultivoId) });

    response.send(cultivo);
}



routerCultivos.post('/', agregarCultivo);
routerCultivos.get('/', verCultivos);
routerCultivos.get('/:cultivoId', verCultivo);
routerCultivos.delete('/:cultivoId', borrarCultivo);
routerCultivos.put('/:cultivoId', actualizarCultivo);

export default routerCultivos;