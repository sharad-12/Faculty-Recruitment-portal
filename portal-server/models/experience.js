const mongoose=require('mongoose');

const experienceSchema = new mongoose.Schema({
    userId:String,
    organization:String,
    designation:String,
    organizationType:String,
    employementType:String,
    initialDate:Date,
    currentWorking:String,
    enddate:Date,
  });
  
  module.exports=new mongoose.model('experiences', experienceSchema);
  