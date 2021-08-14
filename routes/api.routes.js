const { Router } = require('express');
const { postUser, postLogin, putRegister, getRegister, getProducts, newOrders, getOrder, deleteOrder, putAdmin } = require('../controllers/api.controllers');
const { existingUser } = require('../middlewares/existing-data.middlewares');
const { usernameRequiredField, nameSurnammeRequiredField, emailRequiredField, telephoneRequiredField, addressRequiredField, passwordRequiredField } = require('../middlewares/required-field.middlewares');
const { emailSyntaxError, weakPassword } = require('../middlewares/regular.expressions..middlewares');
const { dataError, verifyToken, verifyRoleUser, verifyRoleAdmin } = require('../middlewares/data.error.middleware');

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
    postLogin
);

router.put('/register/:id',
    [
        verifyRoleUser,
        verifyToken,
        emailSyntaxError,
        weakPassword
    ],
    putRegister
);

router.get('/register/:id',
    [
        verifyToken
    ],
    getRegister);

router.post('/orders/:id',
    [
        verifyToken
    ],
    newOrders
);

//router.delete('/order/:id', deleteOrder);

router.get('/order/:id',
    [
        verifyToken
    ],
    getOrder);

router.get('/products', getProducts);

router.put('/admin/:id',
    [
        verifyRoleAdmin,
        verifyToken
    ],
    putAdmin
);

module.exports = router;