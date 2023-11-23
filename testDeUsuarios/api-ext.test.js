import { expect } from "chai"
import supertest from "supertest"
import generador from './generador/usuario.js'


const request = supertest('http://127.0.0.1:8080')

describe('test apirestful', () => {
    describe('GET', () => {
        it('debería retornar un status 200', async () => {
            const reponse = await request.get('/api/users')
            expect(reponse.status).to.eql(200)
        })
    })

    describe('POST', () => {
        it('debería incorporar un usuario', async () => {
            const usuario = generador.get()
            //console.log(usuario)

            const response = await request.post('/api/users').send(usuario)
            expect(response.status).to.eql(200)

            const usuarioGuardado = response.body
            //console.log(prodGuardado)
            expect(usuarioGuardado).to.include.keys('documento','nombre','contrasena','esAdmin','esSuperUser')

            expect(usuarioGuardado.documento).to.eql(usuario.documento)
            expect(usuarioGuardado.nombre).to.eql(usuario.nombre)
            expect(usuarioGuardado.contrasena).to.eql(usuario.contrasena)
            expect(usuarioGuardado.esAdmin).to.eql(usuario.esAdmin)
            expect(usuarioGuardado.esSuperUser).to.eql(usuario.esSuperUser)
        })
    })
})