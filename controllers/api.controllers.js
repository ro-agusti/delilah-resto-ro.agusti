const sequelize = require('../database/connection.database.js');
const jwt = require('jsonwebtoken');
//---IMPORTAR CALLBACKS DE SQL.HELPERS
const { insertUserSQL, verifyDataSQL, modifyUserDataSQL, getUserDataSql, selectProductsDataSql, insertOrdersDataSql, selectOrderDataSql, selectOrdersAdminDataSql, selectOrderAdminDataSql, updateOrdersAdminSql, insertProductDataSql, updateProductsDataSql, selectUsersDataSql, deleteProductDataSql } = require('../helpers/sql.helpers.js');

//---CREAR USUARIO
const postUser = async (req, res) => {
    try {
        const sqlHelpers = await insertUserSQL(req.body)
        respuesta = {
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
    try {
        const { username, email, password } = req.body;
        const confirmed = await verifyDataSQL(username, email, password)
        const signedObject = {
            id: confirmed[0].ID_user,
            username: confirmed[0].username
        }
        const token = jwt.sign(signedObject, process.env.SECRET);
        respuesta = {
            mensaje: 'ingreso exitoso',
            respuesta: token
        };
        res.status(200).send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
};

//---MODIFICAR USUARIO
const putRegister = async (req, res) => {
    try {
        const { idUser } = req.params;
        const { nameSurname, email, telephone, address, password } = req.body;
        const sqlHelpers = await modifyUserDataSQL(nameSurname, email, telephone, address, password, idUser)
        respuesta = {
            mensaje: 'usuario modificado',
            respuesta: { ...req.body, id: sqlHelpers[0] }
        };
        res.status(200).send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
};

//---CONSEGUIR DATOS DE UN USUARIO
const getRegister = async (req, res) => {
    try {
        const { idUser } = req.params;
        const sqlHelpers = await getUserDataSql(idUser);
        respuesta = {
            mensaje: 'usuario seleccionado',
            respuesta: sqlHelpers
        };
        res.status(200).send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
};

//---NUEVO PEDIDO
const newOrders = async (req, res) => {
    try {
        const { idUser } = req.params;
        const { payment_type, order } = req.body;
        const sqlHelpers = await insertOrdersDataSql(payment_type, order, idUser);
        respuesta = {
            mensaje: 'Nuevo pedido',
            respuesta: sqlHelpers
        };
        res.status(200).send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
};

//---DETALLE DEL PEDIDO
const getOrder = async (req, res) => {
    try {
        const {idUser,idOrder } = req.params;//id del pedido
        const sqlHelpers = await selectOrderDataSql(idOrder);
        respuesta = {
            mensaje: 'Detalle del pedido',
            respuesta: sqlHelpers
        };
        res.status(200).send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
};

//---VER TOTAL DE LOS PRODUCTOS
const getProducts = async (req, res) => {
    try {
        const sqlHelpers = await selectProductsDataSql();
        respuesta = {
            mensaje: 'productos',
            respuesta: sqlHelpers
        };
        res.status(200).send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
};

//---MODIFICAR DATOS DEL ADMINISTRADOR
const putAdmin = async (req, res) => {
    try {
        const { idAdmin } = req.params;
        const { nameSurname, email, telephone, address, password } = req.body;
        const sqlHelpers = await modifyUserDataSQL(nameSurname, email, telephone, address, password, idAdmin)
        respuesta = {
            mensaje: 'Administrador modificado',
            respuesta: { ...req.body, id: sqlHelpers[0] }
        };
        res.status(200).send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
};

//---VER LISTADO DE PEDIDOS
const getOrdersAdmin = async (req, res) => {
    try {
        const sqlHelpers = await selectOrdersAdminDataSql();
        respuesta = {
            mensaje: 'Listado de ordenes',
            respuesta: sqlHelpers
        };
        res.status(200).send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
};

//---VER DETALLES DE PEDIDOS
const getOrderAdmin = async (req, res) => {
    try {
        const sqlHelpers = await selectOrderAdminDataSql()
        respuesta = {
            mensaje: 'Listado de detalles de pedidos',
            respuesta: sqlHelpers
        };
        res.status(200).send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
};

//---ADMIN- MODIFICAR ESTADO DE LOS PEDIDOS
const putOrdersAdmin = async (req, res) => {
    try {
        const { ID_orders, state } = req.body;
        await updateOrdersAdminSql(state, ID_orders)
        respuesta = {
            mensaje: 'Pedido Modificado',
            respuesta: req.body
        };
        res.status(200).send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
};

//---ADMIN-CREAR NUEVO PRODUCTO
const postProductsAdmin = async (req, res) => {
    try {
        const { product_name, price, image } = req.body
        await insertProductDataSql(product_name, price, image)
        respuesta = {
            mensaje: 'Nuevo Producto',
            respuesta: req.body
        };
        res.status(200).send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
};

//---ADMIN-MODIFICAR ALGUN PRODUCTO
const putProductsAdmin = async (req, res) => {
    try {
        const {idAdmin,idProduct}=req.params;
        const { ID_product, product_name, price, image } = req.body;
        await updateProductsDataSql(product_name, price, image, idProduct);
        respuesta = {
            mensaje: 'Producto Modificado',
            respuesta: req.body
        };
        res.status(200).send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
};

//---ADMIN-ELIMINAR PRODUCTO
const deleteProductAdmin = async (req, res) => {
    try {
        const { idAdmin, idProduct } = req.params;
        await deleteProductDataSql(idProduct);
        respuesta = {
            mensaje: 'Producto Eliminado',
            respuesta: req.body
        };
        res.status(200).send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
};

//---ADMIN-VER LISTADO DE USUARIOS
const getUsersAdmin = async (req, res) => {
    try {
        const sqlHelpers = await selectUsersDataSql();
        respuesta = {
            mensaje: 'Listado de usuarios',
            respuesta: sqlHelpers
        };
        res.status(200).send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    postUser,
    postLogin,
    putRegister,
    getRegister,
    newOrders,
    getOrder,
    getProducts,
    putAdmin,
    getOrdersAdmin,
    getOrderAdmin,
    putOrdersAdmin,
    postProductsAdmin,
    putProductsAdmin,
    deleteProductAdmin,
    getUsersAdmin
}