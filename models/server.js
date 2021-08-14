const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const sequelize = require('../database/connection.database.js');
//data base

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.EXPRESS_PORT
        this.routeAPI = '/api'
        this.middlewares()
        this.routes()
        this.conection()
    }
    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
        this.app.use(helmet())
    }
    routes(){
        this.app.use(this.routeAPI,require('../routes/api.routes.js'))
    }
    conection(){
        sequelize.authenticate().then(() => {
            console.log('Base de datos conectada')
        }).catch(err => {
            console.error('Error en la concexion a la base de batos', err)
        })/* .finally(() => {
            sequelize.close()
        }) */
    }
    listen(){
        this.app.listen(this.port, ()=> {
            console.log(`servidor web en: http://localhost:${this.port}`)
            console.log(`api en: http://localhost:${this.port}${this.routeAPI}`)
        })
    }
}

module.exports = Server;