require('dotenv').config();
const express = require('express');
const app = express();
const bp = require('body-parser');
const path = require('path');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 5500;
const cors = require('cors');
const fs = require('fs');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bp.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload({ createParentPath: true }));

// Configure session middleware
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge:600000,
    },
  })
);
const usercheck =async(req,res,next)=>
{
  console.log('password is '+req.body.password);
  if (req.session.user == process.env.KEY || req.body.password == process.env.PASSWORD)
  {
    req.session.user = process.env.KEY;
    next();
  }
  else
  {
    res.sendFile(__dirname+"/public/Auth.html")
  }
}
const homecheck=(req,res,next)=>
{
  if(req.session.user == process.env.KEY)
  {
    res.redirect("/user");
  }
  else
  {
    next();
  }
}

app.use(usercheck);
app.get('/',homecheck, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Auth.html'));
});

app.post('/', async (req, res) => {
  const password = req.body.password;
  console.log(password);
  console.log(process.env.PASSWORD);
  if (password == process.env.PASSWORD) {
    req.session.user = process.env.KEY;
    console.log('session id is', req.session.userkey);
    res.redirect('/user');
  } else {
    res.send('Incorrect Credentials');
  }
});
app.get("/user",(req,res)=>
{
    res.sendFile(__dirname+"/public/Upload.html");
})
app.post("/upload",async(req,res)=>
{
    const files =[];
    const filenames=[];
    if(Array.isArray(req.files.file))
    {
      for(obj of req.files.file)
      {
          files.push(obj);
          filenames.push(obj.name)
      }

    }
    else
    {
      files.push(req.files.file);
      filenames.push(req.files.file);
      let file = req.files.file;
      file.mv('./uploads/'+file.name);
      res.redirect('/upload');
      return;

    }
    for(obj of filenames)
    {
      console.log('files name on uploading')
        console.log(obj);
    }
    for(obj of files)
    {
        await obj.mv('./uploads/'+obj.name,(err)=>
        {
            if(err)
            {
                res.send('Error occured during file upload');
                return;
            }
        });
    }
    res.redirect("/upload");
})
app.get("/files", async (req, res) => {
  const arr = fs.readdirSync('./uploads');
  console.log(arr);
  res.send(arr);
});
app.get("/upload",async(req,res)=>
{
  res.sendFile(__dirname+"/public/files.html")
})
app.post("/open/:filename",async(req,res)=>
{
  try 
  {
    const filename = req.params.filename;
    res.sendFile(__dirname+`/uploads/${filename}`)
  } 
  catch (error) 
  {
    res.send('file not found')
  }
})
app.post(`/delete/:filename`,async(req,res)=>
{
  const filename = req.params.filename;
  if(fs.existsSync(`./uploads/${filename}`))
  {
    fs.unlink(`./uploads/${filename}`,(err)=>
    {
      if(err)
      res.send('file could not be deleted')
      else
      {
        res.redirect("/upload");
      }
    })
  }
  else
  {
    res.send('file does not exist')
  }
})
app.get('*',(req,res)=>
{
  res.send('incorrect url')
})
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
