const express=require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const cors=require('cors');
const bcrypt=require("bcryptjs");
const Mail=require('./mail');
const sendFile=require('./sendfileMail')
const path = require('path');
const multer=require('multer');
require('dotenv').config();

const port= process.env.PORT || 5000;
const link = process.env.MONGO_LINK;

const app=express();
mongoose.connect(link).then(()=> console.log("Database connected")).catch(err => console.log(err));

const usermodel=require('./models/user');
const qualificationmodel=require('./models/qualification');
const applicationTypemodel=require('./models/applicationType');
const applicationmodel=require('./models/application');
const experiencemodel=require('./models/experience');
const referencemodel=require('./models/reference');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors({origin:'http://localhost:3000',credentials:true}));
app.use(express.static(path.join(__dirname, 'build')));
app.get("/",(req,res)=>
{
  res.sendFile(__dirname+"/build/index.html");
})
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public'); // Define the folder where uploaded files should be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  },
});
const upload = multer({ storage: storage });

app.post("/register",async(req,res)=>{

    try{
        console.log(req.body);
        const check=await usermodel.findOne({email:req.body.email});

        if(check){
            res.json("exist");
        }
        else{
            req.body.password=await bcrypt.hash(req.body.password,10);
            let user=new usermodel(req.body);
            let data=await user.save();
            res.send(data);
        }
    }
    catch(e){
        res.json("not exist")
    }

});

app.post("/login",async(req,res)=>{

        const result=await usermodel.findOne({email:req.body.email});
        if(result){
            const ismatch=await bcrypt.compare(req.body.password,result.password);

            if(ismatch){
                res.send(result);
            }
            else{
                res.json('Notmatch');
            }
        }
        else{
            res.json("Notfound");
        }
    
});

let otp;
app.post('/getemail',async(req,res)=>{
  console.log(req.body);
  Mail.sendMail(req.body.email);
  otp=Mail.otp;
  console.log(otp);
  res.json("send");
});

app.post('/checkotp',async(req,res)=>{
  console.log(req.body);
  if(req.body.otp=otp){
    res.json("true");
  }
  else{
    res.json("false");
  }
})

app.put('/updatePassword', async (req, res) => {
  const changepassEmail = req.body.email;
  const newPassword = req.body.password;
  try {
      const user = await usermodel.findOne({ email: changepassEmail });

      if (!user) {
        return res.json({ success: false, message: 'User not found' });
      }

      user.password = await bcrypt.hash(newPassword,10);;
      await user.save();
  
      res.json({ success: true, message: 'Password updated successfully' });
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/applicationType', async (req, res) => {
    try {
      const requestData = req.body.application;
      const userId = req.body.userId;
      const finddata=await applicationTypemodel.findOne({userId:userId});
      if(finddata==null){
        const applicationTypeData = new applicationTypemodel({ userId:userId,applicationType: requestData });
        const savedData = await applicationTypeData.save();
        res.json("created");
      }
      else{
        await applicationTypemodel.updateOne(
            {userId:userId},
            {$set:{applicationType: requestData }}
        )
        res.json("updated");
      }
      
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post('/application',async(req, res) => {
    console.log(req.body);
    try{
      const applicationData = {
        userId:req.body.userId,
        firstName:req.body.formData.firstName,
        middleName:req.body.formData.middleName,
        lastName:req.body.formData.lastName,
        fatherName:req.body.formData.fatherName,
        motherName:req.body.formData.motherName,
        birthPlace:req.body.formData.birthPlace,
        Gender:req.body.formData.Gender,
        maritialStatus:req.body.formData.maritialStatus,
        Nationality:req.body.formData.Nationality,
        Category:req.body.formData.Category,
        Religion:req.body.formData.Religion,
        Subjects:req.body.formData.Subjects,
        CommunicationAddress:req.body.formData.CommunicationAddress,
        CommunicationCountry:req.body.formData.CommunicationCountry,
        CommunicationState:req.body.formData.CommunicationState,
        CommunicationCity:req.body.formData.CommunicationCity,
        CommunicationPin:req.body.formData.CommunicationPin,
        PermenantAddress:req.body.formData.PermenantAddress,
        PermenantCountry:req.body.formData.PermenantCountry,
        PermenantState:req.body.formData.PermenantState,
        PermenantCity:req.body.formData.PermenantCity,
        PermenantPin:req.body.formData.PermenantPin,
        Mobile:req.body.formData.Mobile,
        AlternateNumber:req.body.formData.AlternateNumber,
        Photograph:req.body.formData.Photograph,
        Signature:req.body.formData.Signature
        };
        const finddata=await applicationmodel.findOne({userId:req.body.userId});
        if(finddata==null){
          const application = new applicationmodel(applicationData);
          const savedData = await application.save();
          res.json("created");
        }
        else{
          await applicationmodel.updateOne(
              {userId:req.body.userId},
              {$set:applicationData}
          )
          res.json("updated");
        }
       
     }
  catch(e){
      res.json(e);
  }
  });

  app.post('/qualification',upload.single('filename'), async(req, res) => {
    try{
      const qualificationData = {
          userId: req.body.userId,
          qualification:req.body.formData.qualification,
          board:req.body.formData.board,
          college:req.body.formData.college,
          evaluation:req.body.formData.evaluation,
          obtained:req.body.formData.obtained,
          passyear:req.body.formData.passyear,
          subject:req.body.formData.subject,
          filename:req.body.formData.filename
        };
        const finddata=await qualificationmodel.findOne({userId:req.body.userId});
        if(finddata==null){
          const qualification = new qualificationmodel(qualificationData);
          const savedData = await qualification.save();
          res.json("created");
        }
        else{
          await qualificationmodel.updateOne(
              {userId:req.body.userId},
              {$set:qualificationData}
          )
          res.json("updated");
        }
       
     }
  catch(e){
      res.json(e);
  }
  });

app.post('/experience', async(req, res) => {
  try{
    console.log(req.body);
    const experienceData = {
        userId: req.body.userId,
        organization:req.body.formData.organization,
        designation:req.body.formData.designation,
        organizationType:req.body.formData.organizationType,
        employementType:req.body.formData.employementType,
        initialDate:req.body.formData.initialDate,
        currentWorking:req.body.formData.currentWorking,
        enddate:req.body.formData.enddate,
      };
      const finddata=await experiencemodel.findOne({userId:req.body.userId});
      if(finddata==null){
        const experience = new experiencemodel(experienceData);
        const savedData = await experience.save();
        res.json("created");
      }
      else{
        await experiencemodel.updateOne(
            {userId:req.body.userId},
            {$set:experienceData}
        )
        res.json("updated");
      }
   }
catch(e){
    res.json(e);
}
});

app.post('/reference', async(req, res) => {
  try{
    console.log(req.body);
    const refrenceData = {
        userId: req.body.userId,
        Name:req.body.formData.Name,
        Designation:req.body.formData.Designaion,
        Organization:req.body.formData.Organization,
        Address:req.body.formData.Address,
        Email:req.body.formData.Email,
        Mobile_No:req.body.formData.Mobile_No
      };
      const finddata=await referencemodel.findOne({userId:req.body.userId});
      if(finddata==null){
        const refrence = new referencemodel(refrenceData);
        const savedData = await refrence.save();
        res.json("created");
      }
      else{
        await referencemodel.updateOne(
            {userId:req.body.userId},
            {$set:refrenceData}
        )
        res.json("updated");
      }
   }
catch(e){
    res.json(e);
}
});

app.post('/finalData',async(req,res)=>{

  const application =await applicationmodel.findOne({userId:req.body.userId});
  const qualification =await qualificationmodel.findOne({userId:req.body.userId});
  const experience =await experiencemodel.findOne({userId:req.body.userId});
  const refrence =await referencemodel.findOne({userId:req.body.userId});

  res.json({application,qualification,experience,refrence});
})

app.post('/sendemail', (req, res) => {
  const { pdfData } = req.body;
  console.log(pdfData);
 sendFile(pdfData);
 res.status(200).send('Email sent successfully.');
})
app.get("*",(req,res)=>
{
  res.sendFile(__dirname+"/build/index.html");
})
app.listen(port,()=>{
    console.log("server started");
});