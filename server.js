var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/swag-shop');

var Product = require('./model/product');
var WishList = require('./model/wishlist');
const product = require('./model/product');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/product', function(req, res){
 var prod = new Product();
 prod.title = req.body.title;
 prod.price = req.body.price;
 prod.save(function(err, data){
   if (err){
res.status(500).send({error: "could not save product"});
   }else{
     res.send(data);
   }
 })
});

app.get('/product', function(req, res){
Product.find({}, function(err, result){
  if(err){
    res.status(500).send({error: "sorry, we could not get your product"});
  }else{
    res.send(result);
  }
})
});


app.listen(3000, function(){
  console.log('server running at port 3000...');
});