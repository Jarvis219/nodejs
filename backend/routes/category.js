import express from "express";
import {
    userID
} from "../controllers/userControllers";
import {
    requireSignin,
    isAuth,
    isAdmin
} from "../controllers/auth";
import {
    addCategory,
    listCategory,
    categoryByID,
    readCategory,
    removeCategory,
    updateCategory,
    listRelatedCate
} from "../controllers/categoryControllers";
const router = express.Router();

router.get('/categories', listCategory);
router.get('/categories/:categoryId', readCategory);
router.get('/categories/related/:categoryId', listRelatedCate);
router.post('/categories/:userId', requireSignin, isAuth, isAdmin, addCategory);
router.put('/categories/:categoryId/:userId', requireSignin, isAuth, isAdmin, updateCategory)
router.delete('/categories/:categoryId/:userId', requireSignin, isAuth, isAdmin, removeCategory);

// router.delete('/products/:id', (req, res) => {
//     console.log(req.params.id);
// })


router.param("categoryId", categoryByID);
router.param('userId', userID);
module.exports = router;