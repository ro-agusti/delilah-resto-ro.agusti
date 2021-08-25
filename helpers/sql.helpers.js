const sequelize = require('../database/connection.database.js');

const insertUserSQL = async (objectBody) => {
    try {     
        const retorno = await sequelize.query('INSERT INTO `users` (`username`, `name & surname`, `email`, `telephone`, `address`, `password`) VALUES (:username, :nameSurname, :email, :telephone, :address, :password)',
            { replacements: objectBody, type: sequelize.QueryTypes.INSERT })
        return retorno;
    } catch (error) {
        res.status(500).send(error);
    }
};

const existinUsernameSQL = async (bodyUsername) => {
    try {   
        const retorno = await sequelize.query('SELECT * FROM `users` WHERE `username` = :username',
            { replacements: bodyUsername, type: sequelize.QueryTypes.SELECT })
        return retorno;
    } catch (error) {
        res.status(500).send(error);
    }
};

const verifyDataSQL = async (usernameBody, emailBody, passwordBody) => {
    try {  
        const retorno = await sequelize.query('SELECT * FROM `users` WHERE `username` = ? AND `email` = ? AND `password`= ?',
            { replacements: [usernameBody, emailBody, passwordBody], type: sequelize.QueryTypes.SELECT })
        return retorno;
    } catch (error) {
        res.status(500).send(error);
    }
};

const modifyUserDataSQL = async (nameSurnameBody, emailBody, telephoneBody, adressBody, passwordBody, idParams) => {
    try {
        const retorno = await sequelize.query('UPDATE `users` SET `name & surname` = ? , `email` = ? , `telephone` = ? , `address` = ? , `password` = ?  WHERE `ID_user` = ?',
            { replacements: [nameSurnameBody, emailBody, telephoneBody, adressBody, passwordBody, idParams], type: sequelize.QueryTypes.UPDATE })
        return retorno;
    } catch (error) {
        res.status(500).send(error);
    }
};

const verifyRoleDataSQL = async (idParams) => {
    try {
        const retorno = await sequelize.query('SELECT role FROM users WHERE ID_user = ? ',
            { replacements: [idParams], type: sequelize.QueryTypes.SELECT })
        return retorno;
    } catch (error) {
        res.status(500).send(error);
    }
};

const getUserDataSql = async (idParams) => {
    try {
        const retorno = await sequelize.query('SELECT `username`,`name & surname`, `email`, `telephone`, `address`  FROM `users` WHERE ID_user = ?',
            { replacements: [idParams], type: sequelize.QueryTypes.SELECT })
        return retorno;
    } catch (error) {
        res.status(500).send(error);
    }
};

const selectProductsDataSql = async () => {
    try {
        const retorno = await sequelize.query('SELECT * FROM products',
            { type: sequelize.QueryTypes.SELECT })
        return retorno;
    } catch (error) {
        res.status(500).send(error);
    }
};

const selectOrderDataSql = async (idParams) => {
    try {
        const retorno = await sequelize.query('SELECT * FROM `detail`, `products`, `orders` WHERE orders.ID_orders=? ',
            { replacements: [idParams], type: sequelize.QueryTypes.SELECT })
        return retorno;
    } catch (error) {
        res.status(500).send(error);
    }
};

const insertOrdersDataSql = async (paymentType, order, IDuser) => {
    try { 
        const objectID = await sequelize.query('INSERT INTO `orders` SET payment_type = ? , user_ID = ?',
            { replacements: [paymentType, IDuser], type: sequelize.QueryTypes.INSERT })
            const orderID = objectID[0];
            
            order.forEach(async(el,index)  => {
                await sequelize.query('INSERT INTO `detail` SET orders_ID = ?, product_ID = ? , amount = ? ',
                { replacements: [orderID , order[index].product_ID , order[index].amount ], type: sequelize.QueryTypes.INSERT })
            })
        const detailOrder = {
            orderID,
            ...order
        }
        return detailOrder;
    } catch (error) {
        res.status(500).send(error);
    }
};

const selectOrdersAdminDataSql = async () => {
    try {      
        const orders = await sequelize.query('SELECT * FROM orders',
            { type: sequelize.QueryTypes.SELECT });
        return orders;
    } catch (error) {
        res.status(500).send(error);
    }
};

const selectOrderAdminDataSql = async () => {
    try {
        const retorno = await sequelize.query('SELECT * FROM `detail`',
            { type: sequelize.QueryTypes.SELECT });
        console.log(retorno)
        return retorno;
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateOrdersAdminSql = async (stateBody, idOrdersBody) => {
    try {
        const retorno = await sequelize.query('UPDATE `orders` SET `state` = ? WHERE `ID_orders`= ?',
            { replacements: [stateBody, idOrdersBody], type: sequelize.QueryTypes.UPDATE });
        return retorno;
    } catch (error) {
        res.status(500).send(error);
    }
};

const existinOrdersSQL = async (idOrdersBody) => {
    try {
        const retorno = await sequelize.query('SELECT * FROM `orders` WHERE `ID_orders` = ?',
            { replacements: [idOrdersBody], type: sequelize.QueryTypes.SELECT });
        return retorno;
    } catch (error) {
        res.status(500).send(error);
    }
}

const insertProductDataSql = async (nameBody, priceBody, imageBody) => {
    try {
        const retorno = await sequelize.query('INSERT INTO `products` SET product_name = ? , price = ?, image = ?',
            { replacements: [nameBody, priceBody, imageBody], type: sequelize.QueryTypes.INSERT })
        return retorno;
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateProductsDataSql = async (nameBody, priceBody, imageBody, idProductBody) => {
    try {
        const retorno = await sequelize.query('UPDATE `products` SET `product_name` = ?, `price`= ?, `image` =? WHERE `ID_product`= ?',
            { replacements: [nameBody, priceBody, imageBody, idProductBody], type: sequelize.QueryTypes.UPDATE });
        return retorno;
    } catch (error) {
        res.status(500).send(error);
    }
};

const existingProductDataSql = async (idProductBody) => {
    try {
        const retorno = await sequelize.query('SELECT * FROM `products` WHERE `ID_product` = ?',
            { replacements: [idProductBody], type: sequelize.QueryTypes.SELECT });
        return retorno;
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteProductDataSql = async(idProductParams) =>{
    try {     
        const retorno = await sequelize.query('DELETE FROM `products` WHERE `ID_product` = ?',
        {replacements:[idProductParams], type:sequelize.QueryTypes.DELETE});
        return retorno;
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteOrdersDataSql = async(idOrdersParams) =>{
    try {     
        const retorno = await sequelize.query('DELETE FROM `orders` WHERE `ID_orders` = ?',
        {replacements:[idOrdersParams], type:sequelize.QueryTypes.DELETE});
        return retorno;
    } catch (error) {
        res.status(500).send(error);
    }
}

const selectUsersDataSql = async () => {
    const retorno = await sequelize.query('SELECT `ID_user`, `username`, `name & surname`, `email`, `telephone`, `address`, `role` FROM `users`',
        { type: sequelize.QueryTypes.SELECT });
    return retorno;
};

module.exports = {
    insertUserSQL,
    existinUsernameSQL,
    verifyDataSQL,
    modifyUserDataSQL,
    verifyRoleDataSQL,
    getUserDataSql,
    selectProductsDataSql,
    insertOrdersDataSql,
    selectOrderDataSql,
    selectOrdersAdminDataSql,
    selectOrderAdminDataSql,
    updateOrdersAdminSql,
    existinOrdersSQL,
    insertProductDataSql,
    updateProductsDataSql,
    existingProductDataSql,
    deleteProductDataSql,
    selectUsersDataSql,
    deleteOrdersDataSql
}