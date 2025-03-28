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
  const wifi = String(request.query.wifi); 
  const password = Number(request.query.password); 
  console.log("Valores recibidos:", { wifi, password });

  const ref = db.ref("sensor");

  try {
    const snapshot = await ref
      .orderByChild("wifi")
      .equalTo(wifi)
      .once("value");

    if (snapshot.exists()) {
      const data = snapshot.val();

      const dispositivos = Object.values(data).filter(
        (item: any) => item.password === password
      );

      if (dispositivos) {
        response.send(dispositivos);
      } else {
        response.send("No se encontraron coincidencias para la red y contraseña proporcionadas");
      }
    } else {
      response.send("No se encontraron coincidencias para la red proporcionada");
    }
  } catch (error) {
    console.error("Error al consultar Firebase:", error);
    response.status(500).send({
      error: "Error interno del servidor",
    });
  }
}


routerSensor.get("/dispositivos", dispositivosPorRed);
routerSensor.get("/datosSensor", obtenerSensorData);

export default routerSensor;
