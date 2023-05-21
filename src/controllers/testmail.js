import CPRPSuccessPay from '../models/mail/CPRPSuccessPay';
import CPRPCertificates from '../models/CPRPCertificates';
import CPRPSuccessPayManager from '../models/mail/CPRPSuccessPayManager';




module.exports = {
  async send(req, res){ //get one 

     const marketplace =  'joincharible';
     const  data = await (new CPRPCertificates).paid('e03eef44-6e8f-4214-8aa4-6d68a1cf0ac7', marketplace);
     await (new CPRPSuccessPayManager).send(data.data, marketplace);
     res.json(await (new CPRPSuccessPay).send(data.data, marketplace));
  },
}

