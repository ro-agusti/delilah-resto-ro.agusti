const { Router } = require('express');
const { postUser, postLogin } = require('../controllers/api.controllers');
const { existingUser } = require('../middlewares/existing-data.middlewares'); //-------------------
const { usernameRequiredField, nameSurnammeRequiredField, emailRequiredField, telephoneRequiredField, addressRequiredField, passwordRequiredField } = require('../middlewares/required-field.middlewares');
const { emailSyntaxError, weakPassword } = require('../middlewares/regular.expressions..middlewares');
const { dataError } = require('../middlewares/data.error.middleware');

const router = Router();

router.post('/register',
    [
        usernameRequiredField,
        nameSurnammeRequiredField,
        emailRequiredField,
        telephoneRequiredField,
        addressRequiredField,
        passwordRequiredField,
        existingUser, 
        emailSyntaxError,
        weakPassword
    ],
    postUser
);
router.post('/login',
    [
        usernameRequiredField,
        passwordRequiredField,
        emailRequiredField,
        dataError
    ],
    postLogin)


module.exports = router;