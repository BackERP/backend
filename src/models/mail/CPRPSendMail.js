
var nodemailer = require('nodemailer');
import {MAIL_PORT, MAIL_HOST, MAIL_USER, MAIL_PASSWORD}  from '../../config/config';



export default class CPRPSendMail
{

   constructor()
   {
     this.transporter = nodemailer.createTransport({ port: MAIL_PORT,               // true for 465, false for other ports
                                                     host: MAIL_HOST,
                                                     auth: {
                                                             user: MAIL_USER,
                                                             pass: MAIL_PASSWORD,
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
      return await this.wrapedSendMail({from: MAIL_USER,  // sender address
                                         to,   // list of receivers
                                         subject,
                                         html,
                                       });
   }

}
