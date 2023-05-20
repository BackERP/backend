
var nodemailer = require('nodemailer');
import {MAIL_PORT, MAIL_HOST, MAIL_USER, MAIL_PASSWORD, MAIL_USER_RU, MAIL_PASSWORD_RU}  from '../../config/config';



export default class CPRPSendMail
{
   constructor(marketplace)
   {
     this.mail_user = MAIL_USER_RU;
     let mail_password = MAIL_PASSWORD_RU;
     if(marketplace == 'joincharible')
     {
       this.mail_user = MAIL_USER;
       mail_password = MAIL_PASSWORD;
     }

     this.transporter = nodemailer.createTransport({ port: MAIL_PORT,               // true for 465, false for other ports
                                                     host: MAIL_HOST,
                                                     auth: {
                                                             user: this.mail_user,
                                                             pass: mail_password,
                                                      },
                                                      secure: true,
                                                   });

   }
   async wrapedSendMail(mailOptions){
         return new Promise((resolve,reject)=>{
            this.transporter.sendMail(mailOptions, function(error, info){
               if (error) {
                   console.log("error is "+ error);
                   resolve(false); // or use rejcet(false) but then you will have to handle errors
               } 
               else {
                      console.log('Email sent: ' + info.response);
                      resolve(true);
               }
           });
         }
       )
   }
   async send(to, subject, html)
   {
      return await this.wrapedSendMail({from: this.mail_user,  // sender address
                                         to,   // list of receivers
                                         subject,
                                         html,
                                       });
   }

}
