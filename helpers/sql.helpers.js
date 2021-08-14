const sequelize = require('../database/connection.database.js');
const insertUserSQL = async (objectBody) => {
    const retorno = await sequelize.query('INSERT INTO `users` (`username`, `name & surname`, `email`, `telephone`, `address`, `password`) VALUES (:username, :nameSurname, :email, :telephone, :address, :password)',
        { replacements: objectBody, type: sequelize.QueryTypes.INSERT })
    return retorno;
};

const existinUsernameSQL = async (bodyUsername) => {
    const retorno = await sequelize.query('SELECT * FROM `users` WHERE `username` = :username',
        { replacements: bodyUsername, type: sequelize.QueryTypes.SELECT })
    return retorno;
};

const verifyDataSQL = async (usernameBody, emailBody, passwordBody) => {
    const retorno = await sequelize.query('SELECT * FROM `users` WHERE `username` = ? AND `email` = ? AND `password`= ?',
        { replacements: [usernameBody, emailBody, passwordBody], type: sequelize.QueryTypes.SELECT })
    return retorno;
}

const modifyUserDataSQL = async (nameSurnameBody, emailBody, telephoneBody, adressBody, passwordBody, idParams) => {
    const retorno = await sequelize.query('UPDATE `users` SET `name & surname` = ? , `email` = ? , `telephone` = ? , `address` = ? , `password` = ?  WHERE `ID_user` = ?',
        { replacements: [nameSurnameBody, emailBody, telephoneBody, adressBody, passwordBody, idParams], type: sequelize.QueryTypes.UPDATE })
    return retorno;
};

const verifyRoleDataSQL = async (idParams) => {
    const retorno = await sequelize.query('SELECT role FROM users WHERE ID_user = ? ',
        { replacements: [idParams], type: sequelize.QueryTypes.SELECT })
    return retorno;
};

const getUserDataSql = async (idParams) => {
    const retorno = await sequelize.query('SELECT `username`,`name & surname`, `email`, `telephone`, `address`  FROM users WHERE ID_user = ?',
        { replacements: [idParams], type: sequelize.QueryTypes.INSERT })
    return retorno;
};

const selectProductsDataSql = async () => {
    const retorno = await sequelize.query('SELECT * FROM products',
        { type: sequelize.QueryTypes.SELECT })
    return retorno;
};

const selectOrdersDataSql = async () => {
    const retorno = await sequelize.query('SELECT `ID_orders`, `estate`, `time`, `payment_type`, `user_ID` FROM orders, users WHERE orders.user_ID = users.ID_user',
        { type: sequelize.QueryTypes.SELECT })
    return retorno;
};

const selectOrderDataSql = async (idParams) => {
    const retorno = await sequelize.query('SELECT * FROM `order`, `products`, `orders` WHERE order.orders_ID = orders.ID_orders AND orders.ID_orders=? ',
        { replacements: [idParams], type: sequelize.QueryTypes.SELECT })
    return retorno;
}

const insertOrdersDataSql = async (paymentType, order, IDuser) => {
    const objectID = await sequelize.query('INSERT INTO `orders` SET payment_type = ? , user_ID = ?',
        { replacements: [paymentType, IDuser], type: sequelize.QueryTypes.INSERT })
    const orderID = objectID[0];
    for (let index = 0; index < order.length; index++) {
        await sequelize.query('INSERT INTO `order` SET orders_ID = ?, product_ID = ? , amount = ? ',
            { replacements: [orderID, order[index].product_ID, order[index].amount], type: sequelize.QueryTypes.INSERT})
    }
    const detailOrder = {
        orderID,
        ...order
    }
    return detailOrder;
};

module.exports = {
    insertUserSQL,
    existinUsernameSQL,
    verifyDataSQL,
    modifyUserDataSQL,
    verifyRoleDataSQL,
    getUserDataSql,
    selectProductsDataSql,
    selectOrdersDataSql,
    insertOrdersDataSql,
    selectOrderDataSql
}


//-------GET DATOS DEL USUARIO------------------------ 
/* */
//---------------------------------------------------