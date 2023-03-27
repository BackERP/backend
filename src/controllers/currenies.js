import CPRPCurrencies from '../models/CPRPCurrencies';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPCurrencies).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;
    res.json(await (new CPRPCurrencies).list(page, countItems));
  },

  async create(req, res){  // create item
    const { name, code } = req.body;
    res.json(await (new CPRPCurrencies).create(req.account, {name, code}));

  },
  async update(req, res){  // update item
    const { uuid, name, code} = req.body;
    res.json(await (new CPRPCurrencies).update(req.account, {uuid, name, code}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPCurrencies).remove(req.account, {uuid}));
  },

}
