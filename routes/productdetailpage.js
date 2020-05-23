const express = require('express');
const router = express.Router();
const jsonobj = require('./jsonobj');

router.get('/product/:id/:id2', async(req, res) => {
    try{
      const product = await jsonobj.getProductByid(req.params.id, req.params.id2);
      const image = await jsonobj.getImage(req.params.id, req.params.id2, 'large');
      const img1 = image[0];
      const imgr = jsonobj.getAllbf(image);
      const USDprice = (Math.round((product.price)*100)/100).toFixed(2);
      const CADprice = (Math.round(((product.price)*1.39)*100)/100).toFixed(2);
      const EURprice = (Math.round(((product.price)*0.91)*100)/100).toFixed(2);
      const GBPprice = (Math.round(((product.price)*0.82)*100)/100).toFixed(2);
      if (product, image, img1, imgr){
        res.render('productdetailpage', {product, image, img1, imgr, USDprice, CADprice, EURprice, GBPprice});
      } else{
        res.status(404).json({message: "not found"});
      }
    }catch(err){
      res.status(500).json({message: err.message});
    }
      
  });

  module.exports = router;