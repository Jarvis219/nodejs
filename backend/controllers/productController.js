import Product from '../model/productModel'

// import formidable from 'formidable';
// import fs from 'fs'
import _ from 'lodash';

// danh sách sản phẩm 
export const listProduct = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? +req.query.limit : 100;
    let classify = req.query.classify ? req.query.classify : "male";
    // console.log(classify);
    Product.find({
            "classify": new RegExp(classify)
        })
        // .sort([[order,sortBy]])
        .limit(limit)
        .populate('category', 'name')
        .exec((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "product does not exit"
                })
            }
            res.json({
                product
            });
        })
}

// lấy về sp theo dựa trên id
export const productByID = (req, res, next, id) => {
    Product.findById(id)
        .populate('category', 'name')
        .exec((err, product) => {
            if (err || !product) {
                res.status(400).json({
                    error: "product not found"
                })
            }
            req.product = product;
            next();
        })
}
// trả về sản phẩm theo id
export const readProduct = (req, res) => {
    // console.log(res.json(req.product));
    // req.product.photo = undefined;
    return res.json(req.product);
}
// xóa sp theo id
export const removeProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deleteProduct) => {
        if (err) {
            return res.status(400).json({
                error: "delete product failure"
            })
        }
        res.json({
            deleteProduct,
            message: "delete product success"
        })
    })
}

// thêm sp
export const addProduct = (req, res) => {
    // console.log(req.body);

    // if (!req.body.name || !req.body.description || !req.body.price) {
    //     return res.status(400).json({
    //         error: "Enter enough information"
    //     })
    // } else {

    // }
    // let form = new formidable.IncomingForm();
    // form.keepExtensions = true;
    // form.parse(req, (err, fields, files) => {
    // if (err) {
    //     return res.status(400).json({
    //         error: "Add product failure"
    //     })
    // }
    // console.log(fields);
    // const {
    //     name,
    //     description,
    //     price
    // } = fields;
    // // check sự tồn tại của những giá trị bắt buộc 
    // if (!name || !description || !price) {
    //     return res.status(400).json({
    //         error: "Enter enough information"
    //     })
    // }

    const products = new Product(req.body);
    // console.log(products);
    // // check size của ảnh
    // if (files.photo) {
    //     if (files.photo.size > 2000000) {
    //         return res.status(400).json({
    //             error: "Max size 2MB"
    //         })
    //     }
    //     // đưa thông tin data vào photo gồm data và contentType
    //     products.photo.data = fs.readFileSync(files.photo.path);
    //     products.photo.contentType = files.photo.type;
    // }
    // thêm vào db
    products.save((err, data) => {
        if (err) {
            return res.status(400).json({

                error: err
            })
        }
        res.json({
            data
        });
    });
    // })


}
// cập nhật sản phẩm 
export const updateProduct = (req, res) => {
    // let form = new formidable.IncomingForm();
    // // bao gồm cả phần mở rộng 
    // form.keepExtensions = true;
    // form.parse(req, (err, fields, files) => {
    //     if (err) {
    //         return res.status(400).json({
    //             error: "Add product failure"
    //         })
    //     }
    //     const {
    //         name,
    //         description,
    //         price
    //     } = fields;
    //     // check sự tồn tại của những giá trị bắt buộc 
    //     if (!name || !description || !price) {
    //         return res.status(400).json({
    //             error: "Enter enough information"
    //         })
    //     }
    let products = req.product;
    products = _.assignIn(products, req.body);

    // check size của ảnh
    // if (files.photo) {
    //     if (files.photo.size > 2000000) {
    //         return res.status(400).json({
    //             error: "Max size 2MB"
    //         })
    //     }
    //     // đưa thông tin data vào photo gồm data và contentType
    //     products.photo.data = fs.readFileSync(files.photo.path);
    //     products.photo.contentType = files.photo.type;
    // }
    // thêm vào db
    products.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "update product success"
            })
        }
        res.json({
            data
        });
    });
    // })
}


// Trả về sản phẩm cùng danh mục

export const listRelated = (req, res) => {
    // console.log(req);
    // console.log(req.product);
    let limit = req.query.limit ? req.query.limit : 4;
    Product.find({
            _id: {
                $ne: req.product // loại trừ
            },
            category: req.product.category // lấy theo thể loại
        }).limit(limit)
        .populate('category', '_id name')
        .exec((err, products) => {
            if (err) {
                res.status(400).json({
                    error: "Product not found"
                })
            }
            res.json(products)
        })
}
// tìm kiếm theo name
export const listSearch = (req, res) => {
    // console.log(1);
    let limit = req.query.limit ? req.query.limit : 12;
    let q = req.query.q ? req.query.q : '';
    // console.log(q);
    Product.find({
            // name: new RegExp(q)
            "name": {
                $regex: `${q}`,
                $options: '$i'
            }
        }).limit(limit)
        .exec((err, product) => {
            if (err) {
                res.status(400).json({
                    error: "Product not found"
                })
            }
            res.json({
                product
            })
        })
}