import express from "express";
import cors from "cors";
import "dotenv/config";
import CnxPostgress from "./modelo-db/DBPostgres.js";

import UserRouter from "./router/UserRouter.js";
import InsumosRouter from "./router/InsumosRouter.js";
import PlatillosRouter from "./router/PlatillosRouter.js";
import TicketsRouter from "./router/TicketRouter.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// -----------------------------------------------
//         API RESTful : Productos
// -----------------------------------------------
app.use("/api/users", new UserRouter().start())
app.use("/api/insumos", new InsumosRouter().start())
app.use("/api/platillos", new PlatillosRouter().start())
app.use("/api/ticket", new TicketsRouter().start())

// -----------------------------------------------
//        LISTEN DEL SERVIDOR EXPRESS
// -----------------------------------------------
await CnxPostgress.conectar();
const PORT = process.env.PORT;
const server = app.listen(PORT, () =>
  console.log(`Servidor express escuchando en http://localhost:${PORT}`)
);
server.on("error", (error) =>
  console.log(`Error en servidor: ${error.message}`)
);
