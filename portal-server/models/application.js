const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  userId: String,
  firstName:String,
  middleName:String,
  lastName:String,
  fatherName:String,
  motherName:String,
  birthPlace:String,
  Gender:String,
  maritialStatus:String,
  Nationality:String,
  Category:String,
  Religion:String,
  Subjects:String,
  CommunicationAddress:String,
  CommunicationCountry:String,
  CommunicationState:String,
  CommunicationCity:String,
  CommunicationPin:String,
  PermenantAddress:String,
  PermenantCountry:String,
  PermenantState:String,
  PermenantCity:String,
  PermenantPin:String,
  Mobile:Number,
  AlternateNumber:Number,
  Photograph:Object,
  Signature:Object,
});

module.exports = new mongoose.model("applications", applicationSchema);
