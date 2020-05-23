const express = require('express');
const router = express.Router();
const jsonobj = require('./jsonobj');
const fetch = require("node-fetch");


let requestURL = 'https://osf-digital-backend-academy.herokuapp.com/api/categories?secretKey=$2a$08$J3FIGSJZH1Jz/qqou91F0eyhQLUwzJxSRAW4kYB5McQ2OBIOM1p9W';

router.get('/:id/:id2', async(req, res) => {
    try{
    //  const categ = await getCategoryByid(req.params.id2);
      const productsimg = await jsonobj.get1Image(req.params.id2, 'medium');
      const product = await jsonobj.getProducts(req.params.id2);
      const productsimg1 = jsonobj.getFirsthalf(productsimg);
      const productsimg2 = jsonobj.getSecondthalf(productsimg);
      const product1 = jsonobj.getFirsthalf(product);
      const product2 = jsonobj.getSecondthalf(product);
      if(product){
          res.render('subcategorypage',  {product1, product2, productsimg1, productsimg2});        
      } else {
        res.status(404).json({message: "not found"});
      }
    }catch(err){
      res.status(500).json({message: err.message});
    }
  });

  module.exports = router;