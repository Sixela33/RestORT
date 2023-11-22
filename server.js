import express from "express";
import cors from "cors";
import CnxPostgress from "./modelo-db/DBPostgres.js";

import UserRouter from "./router/UserRouter.js";
import InsumosRouter from "./router/InsumosRouter.js";
import PlatillosRouter from "./router/PlatillosRouter.js";
import TicketsRouter from "./router/TicketRouter.js";

class Server{

  constructor(port, persistencia) {
    this.port = port
    this.persistencia = persistencia

    this.app = express();
    this.server = null
  }

  async start() {

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    
    // -----------------------------------------------
    //         API RESTful : Productos
    // -----------------------------------------------

    this.app.use("/api/users", new UserRouter().start())
    this.app.use("/api/insumos", new InsumosRouter().start())
    this.app.use("/api/platillos", new PlatillosRouter().start())
    this.app.use("/api/ticket", new TicketsRouter().start())
    
    // -----------------------------------------------
    //        LISTEN DEL SERVIDOR EXPRESS
    // -----------------------------------------------

    if (this.persistencia == 'postgres') {
      await CnxPostgress.conectar();
    }

    this.server = this.app.listen(this.port, () =>
      console.log(`Servidor express escuchando en http://localhost:${this.port}`)
    );
    this.server.on("error", (error) =>
      console.log(`Error en servidor: ${error.message}`)
    );

    return this.app
  }

  async stop() {
    if (this.server) {
      this.server.close()
      await CnxPostgress.desconectar()
      this.server = null
    }
  }
}

export default Server