import express from "express";
import {
    addPort,
    updatePost,
    removePost,
    listPost,
    readPost,
    postID,
    listPostRelated
} from "../controllers/postControllers";
import {
    userID
} from "../controllers/userControllers";
import {
    requireSignin,
    isAuth,
    isAdmin
} from "../controllers/auth";
const router = express.Router();


router.get('/posts', listPost);
router.get('/posts/related/:postId', listPostRelated);
router.post('/posts/:userId', requireSignin, isAuth, isAdmin, addPort);
router.delete('/posts/:postId/:userId', requireSignin, isAuth, isAdmin, removePost);
router.put('/posts/:postId/:userId', requireSignin, isAuth, isAdmin, updatePost);
router.get('/posts/:postId', readPost);



router.param("postId", postID)
router.param('userId', userID);
module.exports = router;