const sequelize = require('../database/connection.database.js');
const { insertUserSQL } = require('../helpers/sql.helpers.js');

const postUser = async(req,res) => {
    /* const {username, nameSurname, email, telephone, address, password } = req.body; */
    const sqlHelpers = await insertUserSQL(req.body)
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'nuevo user',
        //crea un objeto 
        respuesta: {...req.body,id:sqlHelpers[0]}
      };
      res.status(200).send(respuesta);

};
const postLogin = async(req,res) => {
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'ingreso exitoso',
        //crea un objeto 
        //respuesta: {...req.body,id:sqlHelpers[0]}
      };
      res.status(200).send(respuesta);
}

module.exports = {
    postUser,
    postLogin
}