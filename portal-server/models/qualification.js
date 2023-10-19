const mongoose=require('mongoose');

const qualificationSchema = new mongoose.Schema({
    userId:String,
    qualification: String,
    board: String,
    college: String,
    evaluation: String,
    obtained: String,
    passyear: String,
    subject: String,
    filename:String
  });
  
  module.exports=new mongoose.model('qualifications', qualificationSchema);
  