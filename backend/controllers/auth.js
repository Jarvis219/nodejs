import jwt from 'jsonwebtoken';
const User = require('../model/userModel');
const nodemailer = require('nodemailer');
import _ from 'lodash';
const expressJwt = require('express-jwt');
// var LocalStorage = require('node-localstorage').LocalStorage,
//     localStorage = new LocalStorage('./scratch');

// const flash = require('connect-flash');
// const sgMail = require('@sendgrid/mail')
// import crypto from 'crypto';
// const session = require('express-session')
import {
    v4 as uuidv4
} from 'uuid';
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// đăng ký gửi from về email
export const registerController = async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;
    const users = new User({
        name,
        email,
        password,
        emailToken: uuidv4()
    });
    // console.log(users);
    if (!users.email || !users.hashed_password || !users.name) {
        return res.status(400).json({
            success: false,
            messager: "register false"
        })
    } else {
        const email = users.email;
        const user = await User.findOne({
            email
        });
        // console.log(users.email, users.hashed_password, users.name);
        // console.log(user);
        if (user) {
            return res.status(400).json({
                success: false,
                messager: "email already"
            })
        } else {
            const newUser = await users.save();
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // use SSL
                auth: {
                    user: process.env.EMAIL_FROM,
                    pass: process.env.EMAIL_PASS
                }
            })
            let mailDeltail = {
                from: `Verify your email ${process.env.EMAIL_FROM}`,
                to: users.email,
                subject: 'Verify your email',
                html: `
                <h2>${users.name}! Thanks for resistering on our site</h2>
                <h4>Please verify your mail to continue...</h4>
                 <button><a href="${process.env.LOCAL}">verify</a></button>
                `
            }

            transporter.sendMail(mailDeltail, function (err, infor) {
                if (err) {
                    // console.log(process.env.EMAIL_PASS);
                    // console.log(err);
                    return res.status(401).json({
                        err
                    })
                } else {
                    res.json({
                        emailToken: users.emailToken,
                        message: 'Verfication email is sent to your gmail account'
                    })
                }
            })
        }
    }
}

// xác thực kích hoạt email
export const verifyEmail = async (req, res) => {
    try {
        const token = req.query.token;
        // console.log(token);
        let user = await User.findOne({
            emailToken: token
        });
        // console.log(user);
        if (user) {
            let dataNew = {
                emailToken: null,
                confirmed: true
            }
            // console.log(dataNew);
            dataNew = _.assignIn(user, dataNew);
            // console.log(dataNew);
            dataNew.save((err, data) => {
                // console.log(2);
                if (err) {
                    return res.status(400).json({
                        error: 'active user failure'
                    })
                }
                res.send(
                    `
                    <script>
                        window.location.href = "http://localhost:8080/#/signin"
                    </script>`
                )
                // res.json({
                //     message: "active email successfully",
                //     url: '<a href="http://localhost:8080/#/signin">singin</a>'
                // });
            })
        } else {
            console.log('email is not verified');
            return res.status(403).json({
                error: "Email is not verified"
            })
        }
    } catch (error) {
        console.log(error);
    }
}
// kiểm tra trạng thái email đã kích hoạt hay chưa
export const verifyEmailCheck = async (req, res, next) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        })
        // console.log(user);
        if (user.confirmed) {
            next();
        } else {
            return res.status(400).json({
                error: "Please check your email to verify your account"
            })
        }
    } catch (error) {
        // console.log(1);
        return res.status(401).json({
            error: "Please check user or password"
        })
    }
}

// đăng nhập, check  thông tin truyền vào
exports.signin = (req, res) => {
    const {
        email,
        password
    } = req.body;
    User.findOne({
        email
    }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User with that email does not exist. Please signup"
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password not match"
            })
        }
        const token = jwt.sign({
            _id: user._id
        }, process.env.JWT_SECRET);
        res.cookie('token', token, {
            expire: new Date() + 9999
        });
        const {
            _id,
            name,
            emal,
            permission
        } = user;
        return res.json({
            token,
            user: {
                _id,
                email,
                name,
                permission
            }
        })
    })
}
// đăng xuất 
export const signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: "Singout succsessfully"
    });
}
// export const accountActivation = (req,res)=>{
//     console.log(req.body);
//     const {token} = req.body;
//     if(token){
//         jwt.verify(token, process.env.JWT_ACCOUNT_ACCTIVATION, function(err, decode){
//             if(err){
//                 return res.status(400).json({
//                     error:"Expired link. Signup again"
//                 })
//             }
//             const {name, email, hashed_password}= jwt.decode(token);
//             const user = new User({name, email, hashed_password});
//             user.save((error, user)=>{
//                 if(error){
//                     return res.status(400).json({
//                         error:"Cannot register account"
//                     })
//                 }
//                 user.salt = undefined;
//                 user.hashed_password= undefined;
//                 res.join({user})
//             })
//         }
//     }
// }



// export const signout = (req, res)=>{
//     res.clearCookie('user');
//     res.json({
//         message: "signout successfully"
//     })
// }

export const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
})

export const isAuth = (req, res, next) => {
    // console.log(req.profile);
    // console.log(req.auth);
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    // console.log(user);
    if (!user) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.permission == 0) {
        return res.status(403).json({
            error: "Admin resource! Access Denined"
        })
    }
    next();
}