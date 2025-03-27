import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { db } from "../../services/db/firebase/db";
const routerSensor = express.Router();
import { connect } from "../../services/db/mongoDB/db";

async function obtenerSensorData(request: Request, response: Response) {
  try {
    const snapshot = await db.ref("/sensor").get();
    const data = snapshot.val();
    response.send(data);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    response.send("Error al obtener los datos.");
  }
}

async function agregarSensor(request: Request, response: Response) {

}

async function actualizarSensor(request: Request, response: Response) {

}

async function verSensores(request: Request, response: Response) {

}

async function borrarSensor(request: Request, response: Response) {
    
}

routerSensor.get("/", verSensores);
routerSensor.post("/", agregarSensor);
routerSensor.put("/:idSensor", actualizarSensor);
routerSensor.delete("/:idSensor", borrarSensor);
routerSensor.get("/datosSensor", obtenerSensorData);

export default routerSensor;
