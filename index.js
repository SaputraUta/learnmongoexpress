const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;

const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/shop_db').then(() => {
    console.log('connected to database');
}).catch((err) => {
    console.log(err);
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', {
        products
    });
});

app.get('/product/:id', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.render('products/show', {
        product
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));