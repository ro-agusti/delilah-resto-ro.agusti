const usernameRequiredField = (req, res, next) => {
    const {username, nameSurname, email, telephone, address, password} = req.body;
    if (!username) {
        res.status(403).send('falta el parametro del Username');
    } else {
        next();
    }
};
const nameSurnammeRequiredField = (req, res, next) => {
    const {username, nameSurname, email, telephone, address, password} = req.body;
    if (!nameSurname) {
        res.status(403).send('falta el parametro del Nombre y Apellido');
    } else {
        next();
    }
};
const emailRequiredField = (req, res, next) => {
    const {username, nameSurname, email, telephone, address, password} = req.body;
    if (!email) {
        res.status(403).send('falta el parametro del Email');
    } else {
        next();
    }
};
const telephoneRequiredField = (req, res, next) => {
    const {username, nameSurname, email, telephone, address, password} = req.body;
    if (!telephone) {
        res.status(403).send('falta el parametro del Telefono');
    } else {
        next();
    }
};
const addressRequiredField = (req, res, next) => {
    const {username, nameSurname, email, telephone, address, password} = req.body;
    if (!address) {
        res.status(403).send('falta el parametro de la Direccion');
    } else {
        next();
    }
};
const passwordRequiredField = (req, res, next) => {
    const {username, nameSurname, email, telephone, address, password} = req.body;
    if (!password) {
        res.status(403).send('falta el parametro de la Contraseña');
    } else {
        next();
    }
};

module.exports = {
    usernameRequiredField,
    nameSurnammeRequiredField, 
    emailRequiredField,
    telephoneRequiredField,
    addressRequiredField,
    passwordRequiredField
}