const { verifyDataSQL, verifyRoleDataSQL } = require("../helpers/sql.helpers")
const jwt = require('jsonwebtoken');

const dataError = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const confirmed = await verifyDataSQL(username, email, password)
        if (confirmed.length > 0) {
            next();
        } else {
            res.status(403).send('Datos incorrectos');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const verifyToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send('necesitas un token');
    }
    const token = authorization.split(' ')[1];
    if (!token) {
        return res.status(401).send('necesitas un token');
    }
    jwt.verify(token, process.env.SECRET, (error) => {
        if (error) {
            return res.status(401).send('token invalida');
        } else {
            next();
        }
    })
};

const verifyRoleUser = async (req, res, next) => {
    try {
        const { idUser } = req.params;
        const sqlReturn = await verifyRoleDataSQL(idUser)
        if (sqlReturn[0].role !== 'USER') {
            return res.status(401).send('usuario no autorizado');
        } else {
            next();
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const verifyRoleAdmin = async (req, res, next) => {
    try {
        const { idAdmin } = req.params;
        const sqlReturn = await verifyRoleDataSQL(idAdmin)
        if (sqlReturn[0].role !== 'ADMIN') {
            return res.status(401).send('usuario no autorizado');
        } else {
            next();
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const verifyState = (req,res,next) => {
    const { ID_orders, state } = req.body;
    if (state == 'NUEVO'){
        next();
    } else if (state == 'CONFIRMADO') {
        next();  
    } else if (state == 'PREPARANDO') {
        next();
    }else if (state == 'ENVIADO') {
        next();
    } else if (state == 'ENTREGADO') {
        next();
    } else {     
        return res.status(401).send('error en el estado enviado');
    }
}

module.exports = {
    dataError,
    verifyToken,
    verifyRoleUser,
    verifyRoleAdmin,
    verifyState
}