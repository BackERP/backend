import CPRPSendMail from './CPRPSendMail';
import CPRPTmplMail from './CPRPTmplMail';


export default class CPRPSuccessPay extends CPRPTmplMail
{
   getTemplate(nunjucks, data)
   {
      let template = 'successPay.html';
      if(data.isOriginal)
        template = 'successPayOriginal.html';
      return nunjucks.render(template, { holder: data.holder,  certificates: data.certificates, donation: data.donation, resource: this.getResource()});
   }
   getTile(data, marketplace)
   {
      if(marketplace == 'joincharible')
        return data.holder.name + ', Charible is grateful for your donation';
      return data.holder.name + ', ТокенДобра благодарит вас за пожертвование!';
   }
   async send(data, marketplace)
   {
     return await this.sendData(data, marketplace, data.holder.email, this.getTile(data, marketplace));
   }                                                                                 
}
