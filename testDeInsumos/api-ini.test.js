import { expect } from "chai"
import supertest from "supertest"
import generador from './generador/insumo.js'
import Server from "../server.js"

describe('test apirestful', () => {
    describe('GET', () => {
        it('debería retornar un status 200', async () => {
            const server = new Server(8081, process.env.DATABASE)
            const app = await server.start()

            const request = supertest(app)
            const response = await request.get('/api/insumos')
            
            expect(response.status).to.eql(200)

            await server.stop()
        })
    })

    describe('POST', () => {
        it('debería incorporar un insumo', async () => {
            const server = new Server(8081,process.env.DATABASE)
            const app = await server.start()

            const request = supertest(app)

            const insumo = generador.get()
            console.log(insumo)

            const response = await request.post('/api/insumos').send(insumo)
            expect(response.status).to.eql(200)

            const insumoGuardado = response.body
            //console.log(insumoGuardado)
            expect(insumoGuardado).to.include.keys('nombre','cantidad','costoXunidad','unidadDeMedida')

            expect(insumoGuardado.nombre).to.eql(insumo.nombre)
            expect(insumoGuardado.cantidad).to.eql(insumo.cantidad)
            expect(insumoGuardado.costoXunidad).to.eql(insumo.costoXunidad)
            expect(insumoGuardado.unidadDeMedida).to.eql(insumo.unidadDeMedida)

            await server.stop()
        })
    })
})