const sequelize = require('../database/connection.database.js');
const jwt = require('jsonwebtoken');
//---IMPORTAR CALLBACKS DE SQL.HELPERS
const { insertUserSQL, verifyDataSQL, modifyUserDataSQL, getUserDataSql, selectProductsDataSql, insertOrdersDataSql, selectOrdersDataSql, selectOrderDataSql } = require('../helpers/sql.helpers.js');

//---CREAR USUARIO
const postUser = async (req, res) => {
    try {
        const sqlHelpers = await insertUserSQL(req.body)
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'nuevo user',
            respuesta: { ...req.body, id: sqlHelpers[0] }
        };
        res.status(200).send(respuesta);      
    } catch (error) {
        res.status(500).send(error);
    }
};

//---INGRESAR A LA SECION
const postLogin = async (req, res) => {
    const { username, email, password } = req.body;
    const confirmed = await verifyDataSQL(username, email, password)
    console.log(confirmed);
    const signedObject = {
        id: confirmed[0].ID_user,
        username: confirmed[0].username
    }
    const token = jwt.sign(signedObject, process.env.SECRET);
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'ingreso exitoso',
        respuesta: token
    };
    res.status(200).send(respuesta);
};

//---MODIFICAR USUARIO
const putRegister = async (req, res) => {
    const { id } = req.params;
    const { nameSurname, email, telephone, address, password } = req.body;
    const sqlHelpers = await modifyUserDataSQL(nameSurname, email, telephone, address, password, id)
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'usuario modificado',
        respuesta: { ...req.body, id: sqlHelpers[0] }
    };
    res.status(200).send(respuesta);
};

//---CONSEGUIR DATOS DE UN USUARIO
const getRegister = async (req, res) => {
    const { id } = req.params;
    const sqlHelpers = await getUserDataSql(id);
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'usuario seleccionado',
        respuesta: sqlHelpers[0]
    };
    res.status(200).send(respuesta);
};

//---NUEVO PEDIDO
const newOrders = async(req, res) => {
    const { id } = req.params;
    const { payment_type,order } = req.body;
    const sqlHelpers = await insertOrdersDataSql(payment_type,order, id);
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Nuevo pedido',
        respuesta: sqlHelpers
    };
    res.status(200).send(respuesta);
};

//---DETALLE DEL PEDIDO
const getOrder = async(req,res) => {
    const { id } = req.params;
    const sqlHelpers = await selectOrderDataSql(id);
    console.log(sqlHelpers);
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Detalle del pedido',
        respuesta: sqlHelpers
    };
    res.status(200).send(respuesta);
};

/* const deleteOrder = (req,res) => {
    const { id } = req.params;
} */

//---VER TOTAL DE LOS PRODUCTOS
const getProducts = async (req, res) => {
    const sqlHelpers = await selectProductsDataSql();
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'productos',
        respuesta: sqlHelpers
    };
    res.status(200).send(respuesta);
};

const putAdmin = async(req,res) => {
    const { id } = req.params;
    const { nameSurname, email, telephone, address, password } = req.body;
    const sqlHelpers = await modifyUserDataSQL(nameSurname, email, telephone, address, password, id)
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Administrador modificado',
        respuesta: { ...req.body, id: sqlHelpers[0] }
    };
    res.status(200).send(respuesta);
}

module.exports = {
    postUser,
    postLogin,
    putRegister,
    getRegister,
    newOrders,
    getOrder,
    //deleteOrder,
    getProducts,
    putAdmin
}