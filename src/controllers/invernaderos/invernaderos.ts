import express, { Request, Response } from "express";
import { ObjectId } from 'mongodb';
const routerInvernaderos = express.Router();
import { connect } from "../../services/db/mongoDB/db";

async function verInvernaderos(request: Request, response: Response) {
    const db = await connect();
    const collection = db.collection('Invernadero');

    const invernaderos = await collection.find().toArray();
    response.send(invernaderos);
}

async function verInvernadero(request: Request, response: Response) {
    const db = await connect();
    const collection = db.collection('Invernadero');

    const { idInvernadero } = request.params;

    const invernadero = await collection.findOne({ _id: new ObjectId(idInvernadero) });
    response.send(invernadero);
}

async function agregarInvernadero(request: Request, response: Response) {
    const db = await connect();
    const collection = db.collection('Invernadero');
    
    const { nombre, ubicacion, fecha_agregado, compartir_invernadero } = request.body;

    const existeInvernadero = await collection.findOne({ nombre: nombre });

    if (existeInvernadero) {
        response.status(400).send({ error: "Ya existe un invernadero con este nombre." });
        return;
    }

    const insertResult = await collection.insertOne({
        nombre: nombre, 
        ubicacion: ubicacion, 
        fecha_agregado: fecha_agregado,
        compartir_invernadero: compartir_invernadero
    });

    response.send(insertResult);
}


async function borrarInvernadero(request: Request, response: Response) {
    const db = await connect();
    const collection = db.collection('Invernadero');

    const { idInvernadero } = request.params;

    const deleteResult = await collection.deleteOne({ _id: new ObjectId(idInvernadero) });

    response.send(deleteResult);
}

async function actualizarInvernadero(request: Request, response: Response) {
    const db = await connect();
    const collection = db.collection('Invernadero');
    
    const { invernaderoId, nombre, ubicacion, ultima_modificacion} = request.body;
    
    const filtro = { _id: new ObjectId(invernaderoId) };

    const updateResult = await collection.updateOne(
        filtro,
        {
            $set: {
                nombre: nombre, 
                ubicacion: ubicacion,
                ultima_modificacion: ultima_modificacion
            }
        }
    );

    response.send(updateResult);
}


routerInvernaderos.get('/', verInvernaderos);
routerInvernaderos.get('/:idInvernadero', verInvernadero);
routerInvernaderos.post('/', agregarInvernadero);
routerInvernaderos.put('/:idInvernadero', actualizarInvernadero);
routerInvernaderos.delete('/:idInvernadero', borrarInvernadero);

export default routerInvernaderos
