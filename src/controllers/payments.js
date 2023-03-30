import CPRPPayments from '../models/CPRPPayments';


module.exports = {

  async paid(req, res){  // create item
    res.json(await (new CPRPPayments).paid(req.query));
  },
}
