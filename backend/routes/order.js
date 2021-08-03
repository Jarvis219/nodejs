import express from "express";
import {
    addOrder,
    listOrder,
    orderByID,
    readOrder,
    removeOrder,
    updateOrder, listTotal
} from "../controllers/orderControllers";
import {
    userID
} from "../controllers/userControllers";
import {
    requireSignin,
    isAuth,
    isAdmin
} from "../controllers/auth";
const router = express.Router();

router.get('/orders/totals', listTotal);
router.get('/orders', listOrder);
router.get('/orders/:orderId', readOrder);
router.post('/orders', addOrder);
router.put('/orders/:orderId/:userId', requireSignin, isAuth, isAdmin, updateOrder);
router.delete('/orders/:orderId/:userId', requireSignin, isAuth, isAdmin, removeOrder);

router.param('orderId', orderByID);
router.param('userId', userID);
module.exports = router;