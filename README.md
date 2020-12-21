# Clone Hero Hispano Discord Bot

Hola! Este es el código fuente del bot que esta corriendo en el servidor de Clone Hero Hispano. Son las 12 AM y debería estar haciendo mi tarea.

## Requisitos del sistema

Para poder ejecutar este bot es necesario contar con:

* Node.js v14 en adelante

## Instalación

1. Instalar las dependencias del proyecto con el comando `npm install`.

2. Copiar el archivo `.env.example` y renombrarlo a `.env`.

3. Editar el archivo `.env` agregando las siguientes variables de entorno:

  * `BOT_TOKEN`: Es el token otorgado por el panel de aplicaciones de Discord al momento de crear un bot. [Puedes consultar aquí para saber cómo hacerlo.](https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js-es)
  * `COMMAND_PREFIX`: Es el caracter o caracteres que deben de tener los comandos como prefijo para que este bot pueda ejecutarlos. Por ejemplo con  "!".
  * `MONGO_URI`: URL para conectarse a la base de datos de MongoDB

4. Iniciar con el comando `npm start`.