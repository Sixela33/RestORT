import { faker } from '@faker-js/faker/locale/en'


const get = _ => ({
    documento: faker.number.int({ min: 0, max: 50000000 }),
    nombre: faker.finance.accountName(),
    contrasena: faker.internet.password({ length: 20 }),
    esAdmin: faker.datatype.boolean(),
    esSuperUser: faker.datatype.boolean(),
})


export default {
    get
}