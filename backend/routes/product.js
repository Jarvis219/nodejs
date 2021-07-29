import express from "express";
import {
    userID
} from "../controllers/userControllers";
import {
    requireSignin,
    isAuth,
    isAdmin
} from "../controllers/auth";
const router = express.Router();
import {
    readProduct,
    updateProduct,
    addProduct,
    listProduct,
    productByID,
    removeProduct,
    listRelated,
    listSearch
} from '../controllers/productController';
router.get('/products/search', listSearch)
// list ra sản phẩm
router.get('/products', listProduct)
// chi tiết sản phẩm
router.get('/products/:productId', readProduct)
// sản phẩm liên quan
router.get('/products/related/:productId', listRelated)
// thêm sản phẩm
router.post('/products/:userId', requireSignin, isAuth, isAdmin, addProduct)
// cật nhật sản phẩm
router.put('/products/:productId/:userId', requireSignin, isAuth, isAdmin, updateProduct)
// xóa sản phẩm
router.delete('/products/:productId/:userId', requireSignin, isAuth, isAdmin, removeProduct)
// tìm kiếm sản phẩm




router.param("productId", productByID);
router.param("userId", userID);
module.exports = router;