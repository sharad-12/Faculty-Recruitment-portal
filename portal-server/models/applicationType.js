const mongoose=require('mongoose');

const applicationTypeSchema=new mongoose.Schema({
    userId:{
        type:String,
    },
    applicationType:{
        type:String,
    }
});

module.exports=new mongoose.model("applicationType",applicationTypeSchema);