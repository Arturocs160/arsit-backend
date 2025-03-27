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
    
    const { nombre, ubicacion, fecha_agregado, compartirInvernadero } = request.body;
    
    const insertResult = await collection.insertOne( {
        nombre: nombre, 
        ubicacion: ubicacion, 
        fecha_agregado: fecha_agregado,
        compartirInvernadero: compartirInvernadero
    } );
    
    // console.log('Inserted document =>', insertResult);
    
    response.send(insertResult);
}

// Función por probar e implementar
async function borrarInvernadero(request: Request, response: Response) {
    const db = await connect();
    const collection = db.collection('Invernadero');

    const { idInvernadero } = request.params;

    const deleteResult = await collection.deleteOne({ _id: new ObjectId(idInvernadero) });
    // console.log('Deleted documents =>', deleteResult);

    response.send(deleteResult);
}

// Función por probar e implementar
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

    // console.log('Updated document =>', updateResult);

    response.send(updateResult);
}


routerInvernaderos.get('/', verInvernaderos);
routerInvernaderos.get('/:idInvernadero', verInvernadero);
routerInvernaderos.post('/', agregarInvernadero);
routerInvernaderos.put('/:idInvernadero', actualizarInvernadero);
routerInvernaderos.delete('/:idInvernadero', borrarInvernadero);

export default routerInvernaderos
