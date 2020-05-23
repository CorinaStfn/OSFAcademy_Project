const fetch = require("node-fetch");


let requestURL = 'https://osf-digital-backend-academy.herokuapp.com/api/categories?secretKey=$2a$08$J3FIGSJZH1Jz/qqou91F0eyhQLUwzJxSRAW4kYB5McQ2OBIOM1p9W';

async function getAllCategories(){
    const response = await fetch(requestURL);
    const data = await response.json();
    return data
}

  // category by id
async function getCategoryByid(id){
    const catdesc = await getAllCategories();
    return catdesc.find(cat => cat.id === id);
}

// all category by paret id 
async function getCategoryByParentid(id){
    const catdesc = await getAllCategories();
    return catdesc.filter(scat => scat.parent_category_id === id);
}

// all products by parent id
async function getProducts(b) {
    let a = "http://osf-digital-backend-academy.herokuapp.com/api/products/product_search?primary_category_id=";
    let c = "&secretKey=$2a$08$J3FIGSJZH1Jz/qqou91F0eyhQLUwzJxSRAW4kYB5McQ2OBIOM1p9W";

    let url = a.concat(b, c);
    requestURL = url;

    async function getProd(){
        const response = await fetch(requestURL);
        const data = await response.json();
        return data;
      }

      const product = await getProd();

      return product;
}

//get product by id
async function getProductByid(primary_category_id, id){
    const catdesc = await getProducts(primary_category_id);
    return catdesc.find(prod => prod.id === id);
  }

// first images from all product by type
async function get1Image(id, type) {
    const products = await getProducts(id);
    let prodimgr = [];
    let productsimage = [];
    for(i = 0; i < products.length; i++){
        prodimgr[i] = products[i].image_groups;
        productsimage[i] = prodimgr[i].filter(prod => prod.view_type === type)[0].images;
    }
    return productsimage;
}

//get image from product with specified id 
async function getImage(primary_category_id, id, type){
    const product = await getProductByid(primary_category_id, id);
    const prodimages = product.image_groups;
    const prodimage = prodimages.filter(prod => prod.view_type === type)[0].images;
    return prodimage;
}

// get first half
function getFirsthalf(x){
    let x2 = [];
    for(i = 0; i < Math.trunc((x.length + 1)/2); i++){
        x2[i] =  x[i];
    }
    return x2;  
}
// get second half 
function getSecondthalf(x){
    let x2 = [];
    for(i = Math.trunc((x.length + 1)/2); i < x.length; i++){
        x2[i] =  x[i];
    }
    return x2;  
}

// get all but first
function getAllbf(x){
    let x2 = [];
    for(i = 1; i < x.length; i++){
        x2[i] =  x[i];
    }
    return x2;  
}

module.exports = {
    getAllCategories,
    getCategoryByid,
    getCategoryByParentid,
    getProducts,
    getProductByid,
    get1Image,
    getFirsthalf,
    getSecondthalf,
    getImage,
    getAllbf
}