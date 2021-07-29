import Cart from '../model/cartModel';
import _ from 'lodash';

export const addCart = (req, res) => {
    const cart = new Cart(req.body);
    cart.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Add cart failure"
            })
        }
        res.json({
            data
        })
    })
}

export const listCart = (req, res) => {
    Cart.find((err, cart) => {
        if (err) {
            return res.status(400).json({
                error: "Cart does not exit"
            })
        }
        res.json({
            cart
        })
    })
}

export const listCartUser = (req, res) => {
    let user = req.query.user ? req.query.user : "";
    // console.log(user);
    Cart.find({
        email: user
    }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                err
            })
        }
        res.json({
            data
        })
    })
}

export const cartByID = (req, res, next, id) => {
    Cart.findById(id).exec((err, cart) => {
        if (err || !cart) {
            return res.status(400).json({
                error: "Cart does not exit"
            })
        }
        req.cart = cart;
        next();
    })
}

export const readCart = (req, res) => {
    return res.json(req.cart);
}

export const removeCart = (req, res) => {
    let cart = req.cart;
    cart.remove((err, deleteCart) => {
        if (err || !cart) {
            return res.status(400).json({
                error: "Delete cart failure"
            })
        }
        res.json({
            deleteCart,
            message: "Cart delete successfully"
        })
    })
}

export const updateCart = (req, res) => {
    let cart = req.cart;
    cart = _.assignIn(cart, req.body);
    cart.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Update cart failure"
            })
        }
        res.json({
            data
        })
    })
}