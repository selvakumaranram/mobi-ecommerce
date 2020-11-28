const mongoose = require('mongoose')
 const Schema = mongoose.Schema;
 const Joi = require('@hapi/joi');


 const brandSchema= new Schema({
        user:{type:String,default:"admin"},
        brand_image:{type:String,required:true},
        brand_name:{type:String,required:true},
        serial_number:{type:Number,required:true}
     
 });
 function validate(request) {
       const schema = Joi.object().options({
         abortEarly: false
       }).keys({
              brand_name: Joi.string().required().label("brand_name"),
              brand_image: Joi.string().required().label("brand_image"),
              serial_number:Joi.string().required().label("serial_number")
        
       });
     
       return schema.validate(request);
     }

     exports.Brand = mongoose.model('brand', brandSchema);
     exports.validate = validate;

 