import CPRPMarketPlaces from '../models/CPRPMarketPlaces';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPMarketPlaces).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;

    res.json(await (new CPRPMarketPlaces).list(page, countItems));
  },

  async create(req, res){  // create item
    const { name, url } = req.body;
    res.json(await (new CPRPMarketPlaces).create(req.account, {name, url}));

  },
  async update(req, res){  // update item
    const { uuid, name, url } = req.body;
    res.json(await (new CPRPMarketPlaces).update(req.account, {uuid, name, url}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPMarketPlaces).remove(req.account, {uuid}));
  },

}
