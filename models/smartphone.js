const mongoose = require('mongoose')
 const Schema = mongoose.Schema;

 const variantSchema=mongoose.Schema(
       {storage_ram:{type:String,required: true},
              price:{type:String,required: true}}
       )
 
 const modelSchema= new Schema({
        brand:{ type: Schema.Types.ObjectId, ref: 'Brand' },
        model:{type:String,required:true},
        model_image:{type:String,required:true},
        model_name:{type:String,required:true},
        model_variant:[variantSchema],
        
 });

 const Model = mongoose.model('Model',modelSchema);
 module.exports = Model;