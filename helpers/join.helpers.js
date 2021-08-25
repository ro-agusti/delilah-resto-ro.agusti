const sequelize = require('../database/connection.database.js');

const selectDetailSql = async (ordersID) => {
    try {
        const detail = await sequelize.query('SELECT products.product_name, products.price, detail.amount FROM products, detail WHERE products.ID_product= detail.product_ID AND  detail.orders_ID = ?',
            { replacements: [ordersID], type: sequelize.QueryTypes.SELECT })
        const orders = await sequelize.query('SELECT orders.state, orders.payment_type, users.username, orders.time FROM orders, users WHERE orders.user_ID = users.ID_user AND orders.ID_orders = ?',
            { replacements: [ordersID], type: sequelize.QueryTypes.SELECT })
        const orderDetail = {
            detail,
            orders
        }
        return orderDetail;
    } catch (error) {
        res.status(500).send(error);
    }
};

const selectOrdersAdminSql = async() => {
    try {
        const orders = await sequelize.query('SELECT orders.ID_orders, orders.state, orders.time, orders.payment_type, users.username, users.address, users.telephone FROM orders, users WHERE orders.user_ID = users.ID_user',
        {type: sequelize.QueryTypes.SELECT })
        return orders;
    } catch (error) {
        res.status(500).send(error);
    }
};

const selectOrderAdminSql = async () => {
    try {
        const detail = await sequelize.query('SELECT detail.orders_ID, products.product_name,products.price, detail.amount FROM detail, products WHERE detail.product_ID = products.ID_product',
        {type: sequelize.QueryTypes.SELECT });
        return detail;
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    selectDetailSql,
    selectOrdersAdminSql,
    selectOrderAdminSql
}