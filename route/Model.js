const router = require('express').Router();
let Model = require('../models/productM');


router.get('/',(req,res)=>{
    Model.find().sort({id:1})
    .then(Model=>res.json(Model))
    .catch(err=>res.status(400).json('Error:'+err));
});

router.post('/product',(req,res)=>{
    const model=req.body.model;
     Model.find({model:model})

    .then(Model=>res.json(Model))
    .catch(err=>res.status(400).json('Error:'+err));
});

router.post('/modeldetails',(req,res)=>{
    
    const name=req.body.name;

  Model.find({name:name})
    .then(Model=>res.json(Model))
    .catch(err=>res.status(400).json('Error:'+err));
});


router.post('/addModel',(req,res)=>{
    const id=req.body.id;
    const model=req.body.model;
    const image=req.body.image;
    const name = req.body.name;
    const var1 = req.body.var1;
    const var2 = req.body.var2;
    const var3 = req.body.var3;
    const var4 = req.body.var4;
    const p1 = req.body.p1;
    const p2 = req.body.p2;
    const p3 = req.body.p3;
    const p4 = req.body.p4;

const newModel = new Model({
    id,
    model,
    image,
    name,
    var1,
    var2,
    var3,
    var4,
    p1,
    p2,
    p3,
    p4
});

newModel.save()
.then(()=>res.json('Model added'))
.catch(err=>res.status(400).json('Error:'+err));
});



module.exports = router;