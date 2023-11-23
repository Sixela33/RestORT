import { expect } from 'chai'
import generador from './generador/usuario.js'

describe('***** Test del generador de producto *****', () => {

    it('el producto debe contener los campos nombre, cantidad, costoXunidad y unidadDeMedida', () => {
        const usuario = generador.get()
        console.log(usuario)

        expect(usuario).to.include.keys('documento','nombre','contrasena','esAdmin','esSuperUser')
    })

    it('debería generar insumos aleatorios', () => {
        const usuar1 = generador.get()
        const usuar2 = generador.get()
        console.log(usuar1)
        console.log(usuar2)

        expect(usuar1.documento).not.to.eql(usuar2.documento)
        expect(usuar1.nombre).not.to.eql(usuar2.nombre)
        expect(usuar1.contrasena).not.to.eql(usuar2.contrasena)
        expect(usuar1.esAdmin).not.to.eql(usuar2.esAdmin)
        expect(usuar1.esSuperUser).not.to.eql(usuar2.esSuperUser)
    })
})
//prueba unitaria con mocha