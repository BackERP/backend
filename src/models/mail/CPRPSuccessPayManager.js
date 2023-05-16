import CPRPSendMail from './CPRPSendMail';
const nunjucks = require('nunjucks');
import {MAIL_MANAGER}  from '../../config/config';


export default class CPRPSuccessPayManager
{
   getTemplate(data)
   {
      let template = 'successPay.html';
      if(data.isOriginal)
        template = 'successPayOriginal.html';
      return nunjucks.render(template, { holder: data.holder,  certificates: data.certificates, donation: data.donation});
   }
   async send(data)
   {
      nunjucks.configure('./src/views/mail/en', { autoescape: true });
      const html = this.getTemplate(data);
      return await (new CPRPSendMail).send(MAIL_MANAGER, data.holder.name + ' bought', html);
   }                                                                                 
}
