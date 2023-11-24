# RestORT

## Como ininciar el server

  - Es necesario tener instalado docker y docker compose para iniciar la base de datos
  - Entrar a la carpeta "server" y crear el archivo .env (hay un ejemplo en la misma carpeta (es un txt))
    #### ejemploENV.txt
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
