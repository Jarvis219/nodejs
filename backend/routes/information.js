import express from "express";
const router = express.Router();
import {
    addInfor,
    listInfor,
    readInfor,
    removeInfor,
    inforByID,
    updateInfor
} from '../controllers/informationControllers';
import {
    userID
} from "../controllers/userControllers";
import {
    requireSignin,
    isAuth,
    isAdmin
} from "../controllers/auth";
router.get('/information', listInfor);
router.get('/information/:inforId', readInfor);
router.post('/information/:userId', requireSignin, isAuth, isAdmin, addInfor);
router.put('/information/:inforId/:userId', requireSignin, isAuth, isAdmin, updateInfor);
router.delete('/information/:inforId/:userId', requireSignin, isAuth, isAdmin, removeInfor);


router.param("inforId", inforByID);
router.param('userId', userID);
module.exports = router;