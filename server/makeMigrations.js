import ModeloPostgres from "./modelo-db/ModeloPostgres.js";
import 'dotenv/config'
import bcrypt from 'bcrypt'

const dummyVals = [
   ['1', 'super', 'qwer', true, true]
];

if (process.env.DATABASE === "postgress") {
   try {
       console.log("Haciendo las migraciones utilizando PostgreSQL");
       const modelo = new ModeloPostgres()
       await modelo.makeMigrations(); // Asegúrate de que makeMigrations sea una función asincrónica

       for (const val of dummyVals) {
            const contrasenaHash = await bcrypt.hash(val[2], 10)
           await servicio.crearUsuario(val[0], val[1], contrasenaHash, val[3], val[4]);
       }

       console.log("Creación de usuarios dummy exitosa!");
       
   } catch (err) {
       console.error(err);
   }
}
