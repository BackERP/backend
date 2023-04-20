import CPRPMarketsMarketPlaces from '../models/CPRPMarketsMarketPlaces';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPMarketsMarketPlaces).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;

    res.json(await (new CPRPMarketsMarketPlaces).list(page, countItems));
  },

  async create(req, res){  // create item
    const { marketplace, market, activeMarket } = req.body;
    res.json(await (new CPRPMarketsMarketPlaces).create(req.account, {marketplace, market, activeMarket}));

  },
  async update(req, res){  // update item
    const { uuid, marketplace, market, activeMarket } = req.body;
    res.json(await (new CPRPMarketsMarketPlaces).update(req.account, {uuid, marketplace, market, activeMarket}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPMarketsMarketPlaces).remove(req.account, {uuid}));
  },

}
