const mongoose=require('mongoose');

const referenceSchema = new mongoose.Schema({
    userId:String,
    Name: String,
    Designation: String,
    Organization: String,
    Address: String,
    Email: String,
    Mobile_No: String,
  });
  
  module.exports=new mongoose.model('reference', referenceSchema);
  