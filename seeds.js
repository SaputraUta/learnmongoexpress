const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/shop_db').then(() => {
    console.log('connected to database');
}).catch((err) => {
    console.log(err);
})

const products = [
    {
      "name": "Basic T-Shirt",
      "brand": "ClothCo",
      "price": 120000,
      "color": "White",
      "size": "M"
    },
    {
      "name": "Denim Jacket",
      "brand": "DenimWorks",
      "price": 350000,
      "color": "Blue",
      "size": "L"
    },
    {
      "name": "Running Shoes",
      "brand": "Sporty",
      "price": 500000,
      "color": "Black",
      "size": "XL"
    },
    {
      "name": "Casual Shirt",
      "brand": "StylishWear",
      "price": 200000,
      "color": "Grey",
      "size": "S"
    },
    {
      "name": "Hoodie",
      "brand": "ComfortCloth",
      "price": 250000,
      "color": "Red",
      "size": "XXL"
    }
  ]
  
Product.insertMany(products).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
})