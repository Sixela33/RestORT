# RestORT

Este proyecto fue desarrollado como parte del proyecto final de la facultad. Se trata de un sistema de gestión para restaurantes que se encarga de monitorear el inventario y generar tickets de compra/venta.

## Como ininciar el server

  - Es necesario tener instalado docker y docker compose para iniciar la base de datos
  - Crea el archivo .env (podes encontrar un txt de ejemplo llamado ejemploENV.txt)
  - correr el comando docker compose up
  
  ```
    docker compose up
  ```
  -  la base de datos deberia iniciarse de forma correcta, ahora solo habria que iniciar el servidor: 
  
  ```
    npm install
    npm run makemigrations
    npm run watch
  ```
  ### Si quieren frontend (En desarollo)

  ```
    cd public
    npm i
    npm run build
  ```

Este proyecto está en desarrollo, cualquier contribución o comentario es bienvenido. ¡Gracias por tu interés!
