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
      "category": "Baju"
    },
    {
      "name": "Denim Jeans",
      "brand": "DenimWorks",
      "price": 350000,
      "color": "Blue",
      "category": "Celana"
    },
    {
      "name": "Baseball Cap",
      "brand": "Hatify",
      "price": 75000,
      "color": "Black",
      "category": "Topi"
    },
    {
      "name": "Leather Belt",
      "brand": "AccessoriesHub",
      "price": 90000,
      "color": "Brown",
      "category": "Aksesoris"
    },
    {
      "name": "Hooded Jacket",
      "brand": "ComfortCloth",
      "price": 250000,
      "color": "Red",
      "category": "Jaket"
    }
  ]  
  
Product.insertMany(products).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
})