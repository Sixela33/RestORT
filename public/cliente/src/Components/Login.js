import React, { useContext } from 'react'
import { ApiContext } from '../Context/APIContext'

export default function Login() {
    const { fetchData, setClave } = useContext(ApiContext)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = '/users/login';
            let formData = new FormData(e.target);
            formData = Object.fromEntries(formData)
            const response = await fetchData(url, 'POST', formData);
            if(response.token) {
                //setClave(response.token)
                console.log(response.token)
            }
            console.log('Datos enviados:', response);
          } catch (error) {
            console.error('Error al enviar el formulario', error);
            // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
          }
    }

    return (
        <div>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit} action="/users/login" method="POST">
                <label for="documento">Documento de Usuario:</label>
                <input type="text" id="documento" name="documento" required/>
                <br/>
                
                <label for="contrasena">Contraseña:</label>
                <input type="password" id="contrasena" name="contrasena" required/>
                <br/>

                <button type="submit"> Iniciar Sesion </button>

            </form>
        </div>
    )
}
