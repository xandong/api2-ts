import express, { json } from "express";
import { routes } from "./routes/routes";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

app.use(json());
app.use(routes);

try {
  mongoose
    .connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.xoyct.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => console.log("Conectado ao banco."))
    .then(() => app.listen(3333, () => console.log("SERVER RUNNING...")))
    .catch((e) => console.log(e));
} catch (error) {
  console.log("Erro ao iniciar aplicação: ", error);
}
