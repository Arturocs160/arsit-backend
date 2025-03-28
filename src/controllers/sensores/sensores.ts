import express, { Request, Response } from "express";
import { db } from "../../services/db/firebase/db";
const routerSensor = express.Router();

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

async function dispositivosPorRed(request: Request, response: Response) {
  const { wifi } = request.params;
  console.log("Valor de wifi recibido:", wifi);

  const ref = db.ref("sensor");

  try {
    // Consulta a la base de datos
    const snapshot = await ref.orderByChild("wifi").equalTo("POCO").once("value");
    console.log(snapshot);

    if (snapshot.exists()) {
      // Procesar datos encontrados
      console.log("entra");
      const data = snapshot.val();
      console.log("Datos encontrados:", data);
      response.send(data);
    } else {
      // Manejar caso en el que no se encuentran coincidencias
      response.status(404).send({
        message: "No se encontraron coincidencias para la red proporcionada",
      });
    }
  } catch (error) {
    // Manejar errores durante la consulta
    console.error("Error al consultar Firebase:", error);
    response.status(500).send({
      error: "Error interno del servidor",
    });
  }
}

routerSensor.get("/dispositivos/:wifi", dispositivosPorRed);
routerSensor.get("/datosSensor", obtenerSensorData);

export default routerSensor;
