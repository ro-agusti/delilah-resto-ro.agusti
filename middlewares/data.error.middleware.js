const { verifyDataSQL, verifyRoleDataSQL } = require("../helpers/sql.helpers")
const jwt = require('jsonwebtoken');

const dataError = async(req,res,next) => {
    const {username, email, password } = req.body;
    const confirmed = await verifyDataSQL(username,email,password)
    if (confirmed.length >0) {
        next();
    } else {
        res.status(403).send('Datos incorrectos');
    }
};

const verifyToken = (req,res,next) => {
    const {authorization} = req.headers;
    if (!authorization) {
        return res.status(401).send('necesitas un token');
    }
    const token = authorization.split(' ')[1];
    if(!token){
        return res.status(401).send('necesitas un token');
    }
    jwt.verify(token, process.env.SECRET, (error) =>{
        if (error) {
            return res.status(401).send('token invalida');
        }else{
            next();
        }
    })
};

const verifyRoleUser = async(req,res,next) => {
    const {id} = req.params;
    const sqlReturn = await verifyRoleDataSQL(id)
    if (sqlReturn[0].role !== 'USER') {
        return res.status(401).send('usuario no autorizado para modificar');
    } else {
        next();   
    }
};

const verifyRoleAdmin = async(req,res,next) => {
    const {id} = req.params;
    const sqlReturn = await verifyRoleDataSQL(id)
    if (sqlReturn[0].role !== 'USER') {
        next();   
    } else {
        return res.status(401).send('usuario no autorizado para modificar');
    }
};

module.exports= {
    dataError,
    verifyToken, 
    verifyRoleUser,
    verifyRoleAdmin
}