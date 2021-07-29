import express from 'express';
const router = express.Router();
import {
    registerController,
    verifyEmail,
    verifyEmailCheck,
    signin,
    signout

} from '../controllers/auth'


// router.get("/", (req, res) => res.send("user1"))

// đăng ký
router.post("/signup", registerController);
// check xác thực email
router.get("/verify-email", verifyEmail);
// đăng nhập check email kích hoạt
router.post("/signin", verifyEmailCheck, signin);
//đăng xuất email
router.get('/signout', signout);
module.exports = router