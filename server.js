import express from "express";
import cors from "cors";
import CnxPostgress from "./modelo-db/DBPostgres.js";
import http from "http";
import { Server as SocketIO } from "socket.io";

import UserRouter from "./router/UserRouter.js";
import InsumosRouter from "./router/InsumosRouter.js";
import PlatillosRouter from "./router/PlatillosRouter.js";
import TicketsRouter from "./router/TicketRouter.js";
import SocketRouter from "./router/SocketRouter.js";

class Server{

  constructor(port, persistencia) {
    this.port = port
    this.persistencia = persistencia

    this.app = express()
    this.server = null
    this.io = null
  }

  async start() {

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(express.static('public/dist'))

    if (this.persistencia == 'postgres') {
      await CnxPostgress.conectar();
    }

    this.server = http.createServer(this.app);

    this.io = new SocketIO(this.server).path('/api/sockets');

    this.app.use((req, res, next) => {
      req.io = this.io;
      next();
    });

    // -----------------------------------------------
    //         API RESTful : Productos
    // -----------------------------------------------

    this.app.use("/api/users", new UserRouter().start())
    this.app.use("/api/insumos", new InsumosRouter().start())
    this.app.use("/api/platillos", new PlatillosRouter().start())
    this.app.use("/api/ticket", new TicketsRouter().start())
    this.app.use("/api/sockets", new SocketRouter().start())
    
    // -----------------------------------------------
    //        LISTEN DEL SERVIDOR EXPRESS
    // -----------------------------------------------

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
      this.io = null
    }
  }
}

export default Server