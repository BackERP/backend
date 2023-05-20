import CPRPSendMail from './CPRPSendMail';
const nunjucks = require('nunjucks');



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
   async sendData(data, marketplace, email, title)
   {
      nunjucks.configure('./src/views/mail/' + this.getLanguage(marketplace), { autoescape: true });
      const html = this.getTemplate(nunjucks, data);
      return await (new CPRPSendMail(marketplace)).send(email, title, html);
   }                                                                                 
}
