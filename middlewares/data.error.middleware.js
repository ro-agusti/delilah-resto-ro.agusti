const { verifyDataSQL } = require("../helpers/sql.helpers")

const dataError = async(req,res,next) => {
    const {username, nameSurname, email, telephone, address, password } = req.body;
    const confirmed = await verifyDataSQL(username,email,password)
    if (confirmed.length >0) {
        next();
    } else {
        res.status(403).send('Datos incorrectos');
    }
};
module.exports= {
    dataError
}