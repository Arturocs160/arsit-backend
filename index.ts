import express from "express";
import routes from "./src/routes/index"
import cors from "cors"
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())

routes(app)

app.listen(() => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
}); 