import pkg from 'pg';
import fs from 'fs';

const { Pool } = pkg;

class ModeloPostgres {
    constructor() {
        this.pool = new Pool({
            user: process.env.POSTGRES_DB_USER,
            password: process.env.POSTGRES_DB_PASSWORD,
            host: process.env.POSTGRES_DB_HOST,
            port: process.env.POSTGRES_DB_PORT,
            database: process.env.POSTGRES_DB_NAME
        })
    }

    makeMigrations = async () => {
        const client = await this.pool.connect();
        try {
            const sql = fs.readFileSync('createTables.sql', 'utf8');
            await client.query(sql);
        } catch (error) {
            console.error('Error al ejecutar las migraciones:', error);
        } finally {
            client.release();
        }
    }

    getUsuarios = async () => {
        const client = await this.pool.connect();
        const res = await client.query('SELECT * FROM usuarios')
        return res.rows
    }

    crearUsuario = async (documento, nombre, contrasena, esAdmin, esSuperUser) => {
        const client = await this.pool.connect();
        client.query("INSERT INTO usuarios (documento, nombre, contrasena, esAdmin, esSuperUser) VALUES ($1, $2, $3, $4, $5);",
        [documento, nombre, contrasena, esAdmin, esSuperUser])
        
    }

    getUsuarioXdocumento = async (documento) => {
        const client = await this.pool.connect();
        const res = await client.query("SELECT * FROM usuarios WHERE documento = $1;", [documento])
        return res.rows[0]
    }

}

export default ModeloPostgres