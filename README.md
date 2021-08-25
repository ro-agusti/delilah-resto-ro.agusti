# SPRINT 3 = Backend - "Delilah Restó", App de pedidos de comida

## Recursos y tecnologías utilizadas

- Node.js
- Nodemon
- Express
- Jason Web Token para autenticación via Token
- Helmet
- MySQL2
- Sequelize
- Cors
- Dotenv para manejo de endpoints y testing
- Swagger para documentación de API

El objetivo del trabajo es generar el backend de una app de pedidos de comida, creando la bases de datos relacionales, endpoints funcionales, middlewares necesarios y documentación.

## Documentación de la API

Abrir el archivo `delilah-resto.yaml` y copiar su contenido en [Swagger](https://editor.swagger.io/) o importar el mismo desde las opciones

Se listarán los endpoints y métodos disponibles y la información necesaria para hacer uso de los mismos

## Instalación e inicializacion del proyecto

### 1 - Clonar proyecto

Clonar el repositorio desde el [siguiente link](https://github.com/ro-agusti/delilah-resto-ro.agusti).

### 2 - Instalar de dependencias

* Asegurarse de estar parado en la carpeta clonada desde la terminal y colocar en ella

```
npm install
```

### 3 - Importar base de datos

- Abrir XAMPP y asegurarse que el puerto sobre el cual se está ejecutando es el `3306`, sino puede modificar el archivo `.env` que se encuentra en el indice del proyecto, ahi podra modificar los datos de acuerdo a su dispositivo y sus datos:
    - PORT_DATA_BASE=`3306`
    - NAME_DATA_BASE= `sprint3_delila-resto`
    - USERNAME_DATA_BASE= `root`
    - PASSWORD_BATA_BASE= ` `
- Inicializar los servicios de Apache y MySQL
- Abrir el panel de control del servicio MySQL
- Generar una nueva base de datos llamada `sprint3_delila-resto` desde el panel de control, si desea colocarle otro nombre lo podra hacer pero siempre modificando tambien el archivo `.env` como aclare anteriormente
- Importar el archivo en `/database/sql/sprint3_delila-resto.sql` y dentro de PHP myAdmin, podra importarlo.

### 4 - Iniciar el servidor

* Asegurarse de estar parado en la carpeta clonada desde la terminal y colocar en ella

`node app.js`

O desde `nodemon app.js` si es que lo tiene instalado de manera global en su dispositivo.

### 5 - Listo para empezar!
Testear los endpoints provistos desde el archivo `request.rest` colocada en el indice de la carpeta clonada.




 -*-*-*-*-*-*-*--*-*-*