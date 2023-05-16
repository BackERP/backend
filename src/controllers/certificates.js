import CPRPCertificates from '../models/CPRPCertificates';





module.exports = {

  async paid(req, res){ //get one 
     const {uuid} = req.query;
     res.json(await (new CPRPCertificates).paid(uuid, req.params.marketplace));
  },
}

