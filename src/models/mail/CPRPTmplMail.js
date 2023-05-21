import CPRPSendMail from './CPRPSendMail';
const nunjucks = require('nunjucks');
import { v4 as uuid } from 'uuid';



export default class CPRPTmplMail
{

   getTemplate(render, data)
   {
      return '';
   }
   getLanguage(marketplace)
   {
      if(marketplace == 'joincharible')
        return 'en';
      return 'ru';
   }
   getResource()
   {
     return this.resource;
   }
   attachCommonToTemlate(marketplace)
   {
      const logo_cid = uuid();
      this.resource = {logo:'cid:' + logo_cid};
      const attachments = [];
      if(marketplace == 'joincharible')
        attachments.push({ filename: 'logo.png',
                           path: './images/charible_logo.png',
                           cid: logo_cid}
                         );
       else
        attachments.push({ filename: 'logo.png',
                           path: './images/logo.png',
                           cid: logo_cid}
                         );

       return attachments;

   }
   async sendData(data, marketplace, email, title, attachments)
   {
      nunjucks.configure('./src/views/mail/' + this.getLanguage(marketplace), { autoescape: true });
      if(attachments === undefined)
        attachments = [];
      const atts = this.attachCommonToTemlate(marketplace);
      attachments = atts.reduce((t,a)=>{
                       t.push(a);
                       return t;
                    }, attachments);
      const html = this.getTemplate(nunjucks, data);

      return await (new CPRPSendMail(marketplace)).send(email, title, html, attachments);
   }                                                                                 
}
