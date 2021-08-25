const { Router } = require('express');
const { postUser, postLogin, putRegister, getRegister, getProducts, newOrders, getOrder, putAdmin, getOrdersAdmin, getOrderAdmin, putOrdersAdmin, postProductsAdmin, putProductsAdmin, getUsersAdmin, deleteProductAdmin, deleteOrdersAdmin } = require('../controllers/api.controllers');
const { existingUser, existingOrders, existingProduct, existingOrdersAdmin } = require('../middlewares/existing-data.middlewares');
const { usernameRequiredField, nameSurnammeRequiredField, emailRequiredField, telephoneRequiredField, addressRequiredField, passwordRequiredField } = require('../middlewares/required-field.middlewares');
const { emailSyntaxError, weakPassword } = require('../middlewares/regular.expressions..middlewares');
const { dataError, verifyToken, verifyRoleUser, verifyRoleAdmin, verifyState } = require('../middlewares/data.error.middleware');

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

router.put('/register',
    [
        verifyRoleUser,
        verifyToken,
        emailSyntaxError,
        weakPassword
    ],
    putRegister
);

router.get('/register',
    [
        verifyToken,
        verifyRoleUser
    ],
    getRegister);

router.post('/orders',
    [
        verifyToken,
        verifyRoleUser
    ],
    newOrders
);

router.get('/order/:idOrders',
    [
        verifyToken,
        verifyRoleUser,
        existingOrders
    ],
    getOrder);

router.get('/products', getProducts);

router.put('/admin',
    [
        verifyRoleAdmin,
        verifyToken,
        emailSyntaxError,
        weakPassword
    ],
    putAdmin
);

router.get('/ordersAdmin',
    [
        verifyRoleAdmin,
        verifyToken
    ],
    getOrdersAdmin
);

router.get('/orderAdmin',
    [
        verifyRoleAdmin,
        verifyToken
    ],
    getOrderAdmin
);

router.put('/ordersAdmin/:idOrders',
    [
        verifyToken,
        verifyRoleAdmin,
        existingOrders,
        verifyState
    ],
    putOrdersAdmin
);

router.delete('/ordersAdmin/:idOrders',
    [
        verifyToken,
        verifyRoleAdmin,
        existingOrders
    ],
    deleteOrdersAdmin
);

router.post('/productsAdmin',
    [
        verifyToken,
        verifyRoleAdmin
    ],
    postProductsAdmin
);

router.put('/productsAdmin/:idProduct',
    [
        verifyToken,
        verifyRoleAdmin,
        existingProduct
    ],
    putProductsAdmin
);

router.delete('/productsAdmin/:idProduct',
    [
        verifyToken,
        verifyRoleAdmin,
        existingProduct
    ],
    deleteProductAdmin
)

router.get('/usersAdmin',
    [
        verifyRoleAdmin,
        verifyToken
    ],
    getUsersAdmin
);

module.exports = router;