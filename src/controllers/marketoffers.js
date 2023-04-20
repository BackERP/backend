import CPRPMarketOffers from '../models/CPRPMarketOffers';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPMarketOffers).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;

    res.json(await (new CPRPMarketOffers).list(page, countItems));
  },

  async create(req, res){  // create item
    const { market, source_offer, order, stateMarket } = req.body;
    res.json(await (new CPRPMarketOffers).create(req.account, {market, source_offer, order, stateMarket}));

  },
  async update(req, res){  // update item
    const { uuid, market, source_offer, order, stateMarket } = req.body;
    res.json(await (new CPRPMarketOffers).update(req.account, {uuid, market, source_offer, order, stateMarket}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPMarketOffers).remove(req.account, {uuid}));
  },

}
