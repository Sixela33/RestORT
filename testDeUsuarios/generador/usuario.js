import { faker } from '@faker-js/faker/locale/en'


const get = _ => ({
    documento: faker.string.alpha(11),
    nombre: faker.finance.accountName(),
    contrasena: faker.internet.password({ length: 20 }),
    esAdmin: faker.datatype.boolean(),
    esSuperUser: faker.datatype.boolean(),
})


export default {
    get
}