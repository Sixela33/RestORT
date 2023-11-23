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
    ['Harina', 200, 100, 'KG'],
    ['Azúcar', 100, 200, 'KG'],
    ['Huevos', 50, 300, 'UNIDADES'],
    ['Leche', 50, 30, 'LITROS'],
    ['Aceite', 100, 5, 'LITROS'],
]

const dummyPlatillo = [
    // Array de ingredientes [ID, CANTIDAD], nombrePlatillo, a cuanto se vende
    [[[1, 4], [3, 1]], "Hamburguesa cheddar", 4],
    [[[3, 2], [1, 1], [4, 5]], "Hamburguesa kintuple", 4],
    [[[1, 4], [3, 1]], "Hamburguesa clásica", 6],
    [[[2, 2], [4, 3]], "Pizza margarita", 8],
    [[[1, 2], [3, 2], [5, 1]], "Ensalada de pollo", 10],
    [[[2, 1], [4, 2]], "Tacos de carne asada", 7],
    [[[1, 3], [2, 2]], "Sopa de tomate", 5]
]

const dummyTicket = [
    // [[id platillo, cantidad], [id platillo, caltidad], ..]
    [[[1, 5], [1, 3]], false],
    [[[1, 2], [2, 1]], false],
    [[[1, 2], [3, 1], [5, 3]], false],
    [[[2, 1], [4, 2]], false],
    [[[1, 3], [2, 2]], false],
    [[[3, 2], [4, 1]], false],
    [[[1, 1], [2, 1], [3, 1], [4, 1]], false],
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
                await model.crearTicket(val[0], val[1])
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
