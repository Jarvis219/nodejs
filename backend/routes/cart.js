import express from "express";
import {
    addCart,
    cartByID,
    listCart,
    readCart,
    removeCart,
    updateCart,
    listCartUser
} from "../controllers/cartControllers";
import {
    userID
} from "../controllers/userControllers";
import {
    requireSignin,
    isAuth,
    isAdmin
} from "../controllers/auth";
const router = express.Router();

router.get('/carts/cart-user', listCartUser);
router.get('/carts', listCart);
router.get('/carts/:cartId', readCart);
router.post('/carts/:userId', requireSignin, isAuth, addCart);
router.put('/carts/:cartId/:userId', requireSignin, isAuth, updateCart);
router.delete('/carts/:cartId', removeCart);

router.param('cartId', cartByID);
router.param('userId', userID);
module.exports = router;