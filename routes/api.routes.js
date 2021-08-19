const { Router } = require('express');
const { postUser, postLogin, putRegister, getRegister, getProducts, newOrders, getOrder, putAdmin, getOrdersAdmin, getOrderAdmin, putOrdersAdmin, postProductsAdmin, putProductsAdmin, getUsersAdmin, deleteProductAdmin } = require('../controllers/api.controllers');
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

router.put('/register/:idUser',
    [
        verifyRoleUser,
        verifyToken,
        emailSyntaxError,
        weakPassword
    ],
    putRegister
);

router.get('/register/:idUser',
    [
        verifyToken
    ],
    getRegister);

router.post('/orders/:idUser',
    [
        verifyToken
    ],
    newOrders
);

//--------verificar
router.get('/order/:idUser/:idOrders',
    [
        verifyToken,
        existingOrders
    ],
    getOrder);

router.get('/products', getProducts);

router.put('/admin/:idAdmin',
    [
        verifyRoleAdmin,
        verifyToken,
        emailSyntaxError,
        weakPassword
    ],
    putAdmin
);

router.get('/ordersAdmin/:idAdmin',
    [
        verifyRoleAdmin,
        verifyToken
    ],
    getOrdersAdmin
);

router.get('/orderAdmin/:idAdmin',
    [
        verifyRoleAdmin,
        verifyToken
    ],
    getOrderAdmin
);

router.put('/ordersAdmin/:idAdmin',
    [
        verifyToken,
        verifyRoleAdmin,
        existingOrdersAdmin,
        verifyState
    ],
    putOrdersAdmin
);

router.post('/productsAdmin/:idAdmin',
    [
        verifyToken,
        verifyRoleAdmin
    ],
    postProductsAdmin
);

router.put('/productsAdmin/:idAdmin/:idProduct',
    [
        verifyToken,
        verifyRoleAdmin,
        existingProduct
    ],
    putProductsAdmin
);

router.delete('/productsAdmin/:idAdmin/:idProduct',
    [
        verifyToken,
        verifyRoleAdmin,
        existingProduct
    ],
    deleteProductAdmin
)

router.get('/usersAdmin/:idAdmin',
    [
        verifyRoleAdmin,
        verifyToken
    ],
    getUsersAdmin
);

module.exports = router;