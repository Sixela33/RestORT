import { expect } from "chai"
import supertest from "supertest"
import generador from './generador/insumo.js'


const request = supertest('http://127.0.0.1:8080')

describe('test apirestful', () => {
    describe('GET', () => {
        it('debería retornar un status 200', async () => {
            const reponse = await request.get('/api/insumos')
            expect(reponse.status).to.eql(200)
        })
    })

    describe('POST', () => {
        it('debería incorporar un insumo', async () => {
            const insumo = generador.get()
            //console.log(insumo)

            const response = await request.post('/api/insumos').send(insumo)
            expect(response.status).to.eql(200)

            const insumoGuardado = response.body
            //console.log(prodGuardado)
            expect(insumoGuardado).to.include.keys('nombre','cantidad','costoXunidad','unidadDeMedida')

            expect(insumoGuardado.nombre).to.eql(insumo.nombre)
            expect(insumoGuardado.cantidad).to.eql(insumo.cantidad)
            expect(insumoGuardado.costoXunidad).to.eql(insumo.costoXunidad)
            expect(insumoGuardado.unidadDeMedida).to.eql(insumo.unidadDeMedida)
        })
    })
})