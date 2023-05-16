import CPRPSendMail from './CPRPSendMail';
const nunjucks = require('nunjucks');


export default class CPRPSuccessPay
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
      return await (new CPRPSendMail).send(data.holder.email, data.holder.name + ', Charible is grateful for your donation', html);
   }                                                                                 
}
