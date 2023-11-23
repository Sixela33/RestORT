import { expect } from 'chai'
import generador from './generador/insumo.js'

describe('***** Test del generador de producto *****', () => {

    it('el producto debe contener los campos nombre, cantidad, costoXunidad y unidadDeMedida', () => {
        const insumo = generador.get()
        console.log(insumo)

        expect(insumo).to.include.keys('nombre','cantidad','costoXunidad','unidadDeMedida')
    })

    it('debería generar insumos aleatorios', () => {
        const ins1 = generador.get()
        const ins2 = generador.get()
        console.log(ins1)
        console.log(ins2)

        expect(ins1.nombre).not.to.eql(ins2.nombre)
        expect(ins1.cantidad).not.to.eql(ins2.cantidad)
        expect(ins1.costoXunidad).not.to.eql(ins2.costoXunidad)
        expect(ins1.unidadDeMedida).not.to.eql(ins2.unidadDeMedida)
    })
})
//prueba unitaria con mocha