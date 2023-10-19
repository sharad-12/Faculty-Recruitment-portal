const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const config = require('./config');
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(config.clientID,config.clientSecret);
OAuth2_client.setCredentials({refresh_token:config.refreshToken});

const sendMail=(pdfData)=>
{
    const transport = nodemailer.createTransport(
        {
            service:'gmail',
            auth:{
                type:'OAUTH2',
                user:config.user,
                clientId:config.clientID,
                clientSecret:config.clientSecret,
                refreshToken:config.refreshToken,
                accessToken:config.accessToken
            }
        }
    );
    const mailOption =
    {
        from:`${config.user}`,
        to:'21330@iiitu.ac.in',
        subject:'Application Form',
        text: 'Please find attached the application form.',
        attachments: [
            {
              filename: 'application_form.pdf',
              content: pdfData, // This should be the binary content of the PDF
            },
        ],
    }
    transport.sendMail(mailOption,(err,result)=>
    {
        if(err)
        {
            console.log(err);
            return err;
        }
        else
        {
            console.log(result);
            return "Successfully Send"
        }
    })
}

module.exports = sendMail;