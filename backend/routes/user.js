import express from 'express';
import {
    listUser,
    userID,
    read,
    updateUser,
    removeUser
} from '../controllers/userControllers';

import {
    requireSignin,
} from "../controllers/auth";
const router = express.Router();

router.get('/users', listUser);
router.get('/users/:userId', read);
router.put('/users/:userId', requireSignin, updateUser);
router.delete('/users/:userId', requireSignin, removeUser);

router.param('userId', userID);


module.exports = router;