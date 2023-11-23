import axios from "axios"
import supertest from "supertest"

const pruebaServidorConAxios = async () => {
    const url = 'http://localhost:8080/api/users/aIngresarUnDocUsuario'

    try {
        const {data:body, status} = await axios(url)
        console.log('status code', status)
        console.log('body', body)
    }
    catch(error) {
        console.log('error', error.message)
    }
}

const pruebaServidorConSuperTest = async () => {
    const url = 'http://localhost:8080/api/users'

    try {
        const request = supertest(url)

        const {body, status} = await request.get('/aIngresarUnDocUsuario')
        console.log('status code', status)
        console.log('body', body)
    }
    catch(error) {
        console.log('error', error.message)
    }
}

//pruebaServidorConAxios()
pruebaServidorConSuperTest()
//prueba de integridad con node