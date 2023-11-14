import pkg from 'pg';
const { Pool } = pkg;

class CnxPostgress {
    static pool = new Pool({
        user: process.env.POSTGRES_DB_USER,
        password: process.env.POSTGRES_DB_PASSWORD,
        host: process.env.POSTGRES_DB_HOST,
        port: process.env.POSTGRES_DB_PORT,
        database: process.env.POSTGRES_DB_NAME
    })
    static connection = false
    static db = null

    static conectar = async () => {
        try {
            console.log("Conectando a la base de datos...")
            CnxPostgress.db = await CnxPostgress.pool.connect()
            console.log("Base de datos conectada!")
            CnxPostgress.connection = true
        } catch (error) {
            console.log("error en la conexion", error)
            throw error
        }
    }

    static desconectar = async () => {
        if(CnxPostgress.db){
            await CnxPostgress.db.release()
            CnxPostgress.connection = false
        }
    }
}

export default CnxPostgress