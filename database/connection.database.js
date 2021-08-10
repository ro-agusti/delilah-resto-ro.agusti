const Sequelize = require('sequelize');
//const path = 'mysql://root@localhost:3306/acamica';
const path = `mysql://${process.env.USERNAME_DATA_BASE}:${process.env.PASSWORD_BATA_BASE}@localhost:${process.env.PORT_DATA_BASE}/${process.env.NAME_DATA_BASE}`;
const sequelize = new Sequelize(path, {
    operatorsAliases: false
});
/* sequelize.authenticate().then(() => {
    console.log('Base de datos conectada')
}).catch(err => {
    console.error('Error en la concexion a la base de batos', err)
}).finally(() => {
    sequelize.close()
}) */
module.exports = sequelize;

