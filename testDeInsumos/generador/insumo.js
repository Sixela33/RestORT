import { faker } from '@faker-js/faker/locale/en'


const get = _ => ({
    nombre: faker.commerce.productName(),
    cantidad: faker.number.int({ min: 0, max: 900 }),
    costoXunidad: faker.number.int({ min: 0, max: 900 }),
    unidaddemedida: faker.number.int({ min: 0, max: 900 }),
})


export default {
    get
}