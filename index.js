const path = require('path');
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const port = 3000;
const ErrorHandler = require('./ErrorHandler');

const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/shop_db').then(() => {
    console.log('connected to database');
}).catch((err) => {
    console.log(err);
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(err => next(err));
    }
}

app.get('/products', wrapAsync(async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render('products/index', {
            products, category
        });
    } else {
        const products = await Product.find({});
        res.render('products/index', {
            products, category: 'All'
        });
    }
}))

app.get('/product/create', (req, res) => {
    res.render('products/create');
})

app.post('/products', wrapAsync(async (req , res) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect(`/product/${product._id}`);
}))

app.get('/product/:id/edit/', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.render('products/edit', {
        product
    })
}))

app.delete('/product/:id', wrapAsync(async (req, res) => {
        const id = req.params.id;
        await Product.findByIdAndDelete(id);
        res.redirect('/products');
}))

app.put('/product/:id', wrapAsync(async (req, res) => {
        const id = req.params.id;
        const product = await Product.findByIdAndUpdate(id, req.body, {
            runValidators: true
        })
        res.redirect(`/product/${product._id}`);
}))

app.get('/product/:id', wrapAsync (async (req, res) => {
        const id = req.params.id;
        const product = await Product.findById(id);
        res.render('products/show', {
            product
        });
}))

const validatorHandler = err => {
    err.status = 400;
    err.message = Object.values(err.errors).map(item => item.message);
    return new ErrorHandler(err.message, err.status);
}

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') err = validatorHandler(err);
    if (err.name === 'CastError') {
        err.status = 404;
        err.message = 'Product not found';
    }
    next(err);
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong'} = err;
    res.status(status).send(message);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));