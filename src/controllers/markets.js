import CPRPMarkets from '../models/CPRPMarkets';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPMarkets).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;

    res.json(await (new CPRPMarkets).list(page, countItems));
  },


  async create(req, res){  // create item
    const { name, currency, locale, activeMarket } = req.body;
    res.json(await (new CPRPMarkets).create(req.account, {name, currency, locale, activeMarket}));

  },
  async update(req, res){  // update item
    const { uuid, name, currency, locale, activeMarket } = req.body;
    res.json(await (new CPRPMarkets).update(req.account, {uuid, name, currency, locale, activeMarket}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPMarkets).remove(req.account, {uuid}));
  },

}
