import CPRPPayments from '../models/CPRPPayments';


module.exports = {

  async paid(req, res){  // create item
//req.query
    res.json(await (new CPRPPayments).paid(req.body));
  },
}
