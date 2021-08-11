const sequelize = require('../database/connection.database.js');
const insertUserSQL = async(objectBody) => {
    const retorno = await sequelize.query('INSERT INTO `users` (`username`, `name & surname`, `email`, `telephone`, `address`, `password`) VALUES (:username, :nameSurname, :email, :telephone, :address, :password)',
    {replacements: objectBody, type: sequelize.QueryTypes.INSERT})
    return retorno;
};

const existinUsernameSQL = async(bodyUsername) => { 
    const retorno = await sequelize.query('SELECT * FROM `users` WHERE `username` = :username',
    {replacements: bodyUsername, type: sequelize.QueryTypes.SELECT})
    return retorno;
};

const verifyDataSQL = async(usernameBody, emailBody, passwordBody) => {
    const retorno = await sequelize.query('SELECT * FROM `users` WHERE `username` = ? AND `email` = ? AND `password`= ?',
    {replacements: [usernameBody, emailBody, passwordBody] , type: sequelize.QueryTypes.SELECT})

    return retorno;
}

module.exports = {
    insertUserSQL,
    existinUsernameSQL,
    verifyDataSQL
}