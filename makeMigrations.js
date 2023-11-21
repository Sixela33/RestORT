import 'dotenv/config'
import bcrypt from 'bcrypt'
import CnxPostgress from "./modelo-db/DBPostgres.js"
import ModeloPostgres from "./modelo-db/DAO/ModeloPostgres.js"

const dummyUsers = [
    // DNI, nombre, contra, esAdmin, esSuperUser
   ['00000000000', 'super', 'qwerqwer', true, true],
   ['11111111111', 'man', 'qwerqwer', false, false]
]

const dummyIngredientes = [
    // nombre, cantidad, costoXunidad, unidadDeMedida
    ['Harina', 2, 100, 'KG'],
    ['Azúcar', 1, 200, 'KG'],
    ['Huevos', 12, 300, 'UNIDADES'],
    ['Leche', 1, 30, 'LITROS'],
    ['Aceite', 0.5, 5, 'LITROS'],
]

const dummyPlatillo = [
    // Array de ingredientes [ID, CANTIDAD], nombrePlatillo, a cuanto se vende
    [[[1, 4], [3, 1]], "amvorgesa", 4],
    [[[3, 2], [1, 1], [4, 5]], "amvorgesa kintuple", 4],
]

const dummyTicket = [
    [[1, 5], [1, 3]]
]

const hacerMigraciones = async () => {
    if (process.env.DATABASE === "postgres") {
        await CnxPostgress.conectar()
        const model = new ModeloPostgres()
        try {
            console.log("Haciendo las migraciones utilizando PostgreSQL");
            if (!CnxPostgress.connection) throw new Error("No se establecio la conexion con la base de datos")

            await model.makeMigrations()
            
            for (const val of dummyUsers) {
                const contrasenaHash = await bcrypt.hash(val[2], 10)
                await model.crearUsuario(val[0], val[1], contrasenaHash, val[3], val[4]);
            }
            console.log("Creación de usuarios dummy exitosa!");


            for (const val of dummyIngredientes){
                await model.crearInsumo(val[0], val[1], val[2], val[3])
            }
            console.log("Creación de ingredientes dummy exitosa!");


            for (const val of dummyPlatillo) {
                await model.crearPlatillo(val[0], val[1], val[2])
            }

            for (const val of dummyTicket) {
                await model.crearTicket(val)
            }

            console.log("Creación de platillos dummy exitosa!");
        
        } catch (err) {
            console.error(err);
        } finally {
            CnxPostgress.desconectar();
        }
    }
}

console.log("comenzando migraciones")
await hacerMigraciones()
