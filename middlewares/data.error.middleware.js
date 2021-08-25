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

const verifyRoleUser = (req, res, next) => {
    let { authorization } = req.headers;
    const tokenSended = authorization.split(' ')[1]
    const jwtDecode = jwt.decode(tokenSended, process.env.SECRET);
    if (jwtDecode.role !== 'USER') {
        return res.status(401).send('unauthorized user');
    } else {
        req.user= jwtDecode
        next();
    }
};

const verifyRoleAdmin = (req, res, next) => {
    let { authorization } = req.headers;
    const tokenSended = authorization.split(' ')[1]
    const jwtDecode = jwt.decode(tokenSended, process.env.SECRET);
    if (jwtDecode.role !== 'ADMIN') {
        return res.status(401).send('unauthorized user');
    } else {
        req.admin = jwtDecode
        next();
    }
};

const verifyState = (req,res,next) => {
    let { ID_orders, state } = req.body;
    if (state = 'NUEVO'){
        next();
    } else if (state = 'CONFIRMADO') {
        next();  
    } else if (state = 'PREPARANDO') {
        next();
    }else if (state = 'ENVIADO') {
        next();
    } else if (state = 'ENTREGADO') {
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