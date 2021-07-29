import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

const session = require('express-session')
const flash = require('connect-flash');
const app = express()
dotenv.config()

const productRouters = require('./routes/product');
const categoryRouters = require('./routes/category');
const authRouters = require('./routes/auth');
const postRouters = require('./routes/post');
const contactRouters = require('./routes/contact');
const inforRouters = require('./routes/information');
const orderRouters = require('./routes/order');
const cartRouters = require('./routes/cart');
const userRouters = require('./routes/user');


mongoose.connect(
    process.env.MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(() => console.log('DB Connected'), )

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

app.use(express.json());
app.use(cors({
    credentials: 'same-origin'
}));

app.use(session({
    secret: 'secret',
    cookie: false,
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use('/api', productRouters);
app.use('/api', categoryRouters);
app.use('/api/auth', authRouters, );
app.use('/api/', postRouters);
app.use('/api/', contactRouters)
app.use('/api/', inforRouters);
app.use('/api', orderRouters);
app.use('/api', cartRouters);
app.use('/api', userRouters);


const port = process.env.PORT || 8080;
app.listen(port, () => {

    console.log(`server: ${port}`);
})