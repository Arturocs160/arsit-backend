import express, { Request, Response } from "express";
import { ObjectId } from 'mongodb';
const routerCultivos = express.Router();
import { connect } from "../../services/db/mongoDB/db";


async function agregarCultivo(request: Request, response: Response) {
    const db = await connect();
    const cultivosCollection = db.collection('Cultivos');
    const invernaderosCollection = db.collection('Invernadero');
    
    const { cultivo, dispositivo, invernaderoId, fecha_siembra, nota, temperaturaMin, temperaturaMax, humedadMin, humedadMax } = request.body;

    const invernadero = await invernaderosCollection.findOne({ _id: new ObjectId(invernaderoId) });
    console.log(invernadero);
    if (!invernadero) {
        response.status(404).send({ error: "El invernadero especificado no existe." });
        return;
    }

    if (!invernadero.compartir_invernadero) {
        response.status(403).send({ error: "El invernadero no permite agregar más cultivos." });
        return;
    }

    const existeCultivo = await cultivosCollection.findOne({ cultivo: cultivo, invernaderoId: invernaderoId });
    if (existeCultivo) {
        response.status(400).send({ error: "Ya existe un cultivo con ese nombre en el invernadero especificado." });
        return;
    }

    const dispositivoUsado = await cultivosCollection.findOne({ dispositivo: dispositivo });
    if (dispositivoUsado) {
        response.status(400).send({ error: "El dispositivo ya está asignado a otro cultivo." });
        return;
    }

    const insertResult = await cultivosCollection.insertOne({
        cultivo: cultivo,
        dispositivo: dispositivo,
        invernaderoId: invernaderoId,
        fecha_siembra: fecha_siembra,
        nota: nota,
        parametros_optimos: {
            temperatura: { min: temperaturaMin, max: temperaturaMax },
            humedad: { min: humedadMin, max: humedadMax }
        }
    });

    response.send(insertResult);
}




async function verCultivos(request: Request, response: Response) {
    const db = await connect();
    const collection = db.collection('Cultivos');

    const invernaderos = await collection.find().toArray();
    response.send(invernaderos);
}

async function borrarCultivo(request: Request, response: Response) {
    const db = await connect();
    const collection = db.collection('Cultivos');

    const { cultivoId } = request.params;

    const deleteResult = await collection.deleteOne({ _id: new ObjectId(cultivoId) });

    response.send(deleteResult);
}

async function actualizarCultivo(request: Request, response: Response) {
    const db = await connect();
    const collection = db.collection('Cultivos');
    
    const { cultivoId, cultivo, invernaderoId, fecha_siembra, nota, temperaturaMin, temperaturaMax, humedadMin, humedadMax } = request.body;
    
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