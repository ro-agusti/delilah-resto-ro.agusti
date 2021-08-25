const Sequelize = require('sequelize');
const path = `mysql://${process.env.USERNAME_DATA_BASE}:${process.env.PASSWORD_BATA_BASE}@localhost:${process.env.PORT_DATA_BASE}/${process.env.NAME_DATA_BASE}`;
const sequelize = new Sequelize(path, {
    operatorsAliases: false
});
module.exports = sequelize;

