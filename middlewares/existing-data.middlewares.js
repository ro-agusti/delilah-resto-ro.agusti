const { existinUsernameSQL, existinOrdersSQL, existingProductDataSql } = require("../helpers/sql.helpers");

const existingUser = async(req,res,next) => { 
    try {
        const confirmed = await existinUsernameSQL(req.body)
        if (confirmed.length >0) {
            res.status(403).send('Username existente, cambialo por otro');
        } else {
            next();
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const existingOrdersAdmin = async(req,res,next) => {
    try {
        const { ID_orders, state } = req.body;
        const confirmed = await existinOrdersSQL(ID_orders)
        if (confirmed.length>0) {
            next();
        } else {
            res.status(403).send('No existe el pedido selecionado');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const existingOrders = async(req,res,next) => {
    try {
        const { idOrders } = req.params;
        const confirmed = await existinOrdersSQL(idOrders)
        if (confirmed.length>0) {
            next();
        } else {
            res.status(403).send('No existe el pedido selecionado');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const existingProduct = async(req,res,next) => {
    try {
        const {idProduct} = req.params;
       // const { ID_product, product_name, price, image } = req.body;
        const confirmed = await existingProductDataSql(idProduct)
        if (confirmed.length>0) {
            next();
        } else {
            res.status(403).send('No existe el producto selecionado');
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    existingUser,
    existingOrders,
    existingProduct,
    existingOrdersAdmin
}