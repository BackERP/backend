import CPRPSuccessPay from '../models/mail/CPRPSuccessPay';
import CPRPCertificates from '../models/CPRPCertificates';
import CPRPSuccessPayManager from '../models/mail/CPRPSuccessPayManager';




module.exports = {
  async send(req, res){ //get one 

     const  data = await (new CPRPCertificates).paid('12fc1f79-7459-4711-aa46-06821f68caa4', 'joincharible')
     await (new CPRPSuccessPayManager).send(data.data);
     res.json(await (new CPRPSuccessPay).send(data.data));
  },
}

