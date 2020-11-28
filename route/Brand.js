const router = require('express').Router();
let Brand = require('../models/BrandModel');


router.route('/').get((req,res)=>{
    Brand.find().sort({id:1})
    .then(brand=>res.json(brand))
    .catch(err=>res.status(400).json('Error:'+err));
});

router.route('/add').post((req,res)=>{
    const id=req.body.id
    const image=req.body.image;
    const name = req.body.name;

const newBrand = new Brand({
    id,
    image,
    name,
});

newBrand.save()
.then(()=>res.json('Brand added'))
.catch(err=>res.status(400).json('Error:'+err));
});

module.exports = router;