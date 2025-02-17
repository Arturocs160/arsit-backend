import express from "express";
import routes from "./src/routes/index"
import cors from "cors"

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json())

routes(app)

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
}); 