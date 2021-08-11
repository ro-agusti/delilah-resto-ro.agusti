const { existinUsernameSQL } = require("../helpers/sql.helpers");

const existingUser = async(req,res,next) => { 
    const confirmed = await existinUsernameSQL(req.body)
    if (confirmed.length >0) {
        res.status(403).send('Username existente, cambialo por otro');
    } else {
        next();
    }

};

module.exports = {
    existingUser
}