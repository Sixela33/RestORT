import { expect } from "chai"
import supertest from "supertest"
import generador from './generador/usuario.js'
import Server from "../server.js"

describe('test apirestful', () => {
    describe('GET', () => {
        it('debería retornar un status 200', async () => {
            const server = new Server(8081, process.env.DATABASE)
            const app = await server.start()

            const request = supertest(app)
            const response = await request.get('/api/users')
            
            expect(response.status).to.eql(200)

            await server.stop()
        })
    })

    describe('POST', () => {
        it('debería incorporar un usuario', async () => {
            const server = new Server(8081,process.env.DATABASE)
            const app = await server.start()

            const request = supertest(app)

            const usuario = generador.get()

            
            const res = await request.post('/api/users/login').send({ documento: "00000000000", contrasena: "qwerqwer" })

            const response = await request.post('/api/users/register').set({"Authorization": res.body.token}).send(usuario)
            expect(response.status).to.eql(201)

            const usuarioGuardado = response.body
            //console.log(usuarioGuardado)
            expect(usuarioGuardado).to.include.keys('documento','nombre','contrasena','esAdmin','esSuperUser')

            expect(usuarioGuardado.documento).to.eql(usuario.documento)
            expect(usuarioGuardado.nombre).to.eql(usuario.nombre)
            expect(usuarioGuardado.contrasena).to.eql(usuario.contrasena)
            expect(usuarioGuardado.esAdmin).to.eql(usuario.esAdmin)
            expect(usuarioGuardado.esSuperUser).to.eql(usuario.esSuperUser)

            
            await server.stop()

        })
    })
})