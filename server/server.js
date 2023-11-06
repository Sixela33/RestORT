import express from "express"
import cors from "cors"
import 'dotenv/config'
import UserRouter from "./router/UserRouter.js"
import CnxPostgress from "./modelo-db/DBPostgres.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use(express.static('public/cliente/build'))

// -----------------------------------------------
//         API RESTful : Productos
// -----------------------------------------------
app.use('/users', new UserRouter().start())
await CnxPostgress.conectar()

// -----------------------------------------------
//        LISTEN DEL SERVIDOR EXPRESS
// -----------------------------------------------
const PORT = process.env.PORT
const server = app.listen(PORT, () => console.log(`Servidor express escuchando en http://localhost:${PORT}`))
server.on('error', error => console.log(`Error en servidor: ${error.message}`))
