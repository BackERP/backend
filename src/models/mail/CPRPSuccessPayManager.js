import CPRPSendMail from './CPRPSendMail';
//const nunjucks = require('nunjucks');
import {MAIL_MANAGER}  from '../../config/config';
import CPRPTmplMail from './CPRPTmplMail';


export default class CPRPSuccessPayManager  extends CPRPTmplMail
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
        return data.holder.name + ' donated';
      return data.holder.name + ' поддержал';
   }
   async send(data, marketplace)
   {
     return await this.sendData(data, marketplace, MAIL_MANAGER, this.getTile(data, marketplace));
   }                                                                                 
}
