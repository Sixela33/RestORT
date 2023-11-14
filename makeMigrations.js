import 'dotenv/config'
import bcrypt from 'bcrypt'
import CnxPostgress from "./modelo-db/DBPostgres.js"
import ModeloPostgres from "./modelo-db/DAO/ModeloPostgres.js"

const dummyVals = [
   ['00000000000', 'super', 'qwerqwer', true, true]
]

const hacerMigraciones = async () => {
    if (process.env.DATABASE === "postgress") {
        await CnxPostgress.conectar()
        const model = new ModeloPostgres()
        try {
            console.log("Haciendo las migraciones utilizando PostgreSQL");
            if (!CnxPostgress.connection) throw new Error("No se establecio la conexion con la base de datos")

            await model.makeMigrations()
        
            for (const val of dummyVals) {
                    const contrasenaHash = await bcrypt.hash(val[2], 10)
                await model.crearUsuario(val[0], val[1], contrasenaHash, val[3], val[4]);
            }
        
            console.log("Creación de usuarios dummy exitosa!");
        
        } catch (err) {
            console.error(err);
        } finally {
            CnxPostgress.desconectar();
        }
    }
}

await hacerMigraciones()
