import { expect } from "chai"
import supertest from "supertest"
import Server from "../server.js"


const request = supertest('http://127.0.0.1:8080')

describe('test apirestful', () => {
    describe('GET', () => {
        it('debería retornar un insumo', async () => {

            const server = new Server(8081, process.env.DATABASE)
            const app = await server.start()
            const request = supertest(app)

            const res = await request.post('/api/users/login').send({ documento: "00000000000", contrasena: "qwerqwer" })

            const response = await request.get('/api/insumos/1').set({"Authorization": res.body.token})
  
            expect(response.status).to.eql(200)
            const insumo_buscado = response.body[0]

            expect(insumo_buscado).to.include.keys('insumoid','nombre','cantidad','costoxunidad','unidaddemedida')

            expect(insumo_buscado.insumoid).to.eql(1)
            expect(insumo_buscado.nombre).to.eql('Harina')
            expect(insumo_buscado.cantidad).to.eql("-89")
            expect(insumo_buscado.costoxunidad).to.eql('100')
            expect(insumo_buscado.unidaddemedida).to.eql('KG')

            await server.stop()
        })
    })

    describe('GET', () => {
        it('debería retornar todos los insumos', async () => {

            const server = new Server(8081, process.env.DATABASE)
            const app = await server.start()
            const request = supertest(app)

            const res = await request.post('/api/users/login').send({ documento: "00000000000", contrasena: "qwerqwer" })

            const response = await request.get('/api/insumos').set({"Authorization": res.body.token})

            expect(response.status).to.eql(200)

            await server.stop()

        })
    })
})