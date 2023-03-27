import CPRPAssetsProviders from '../models/CPRPAssetsProviders';

module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPAssetsProviders).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;
    res.json(await (new CPRPAssetsProviders).list(page, countItems));
  },


  async create(req, res){  // create item
    const { name, default_item} = req.body;
    res.json(await (new CPRPAssetsProviders).create(req.account, {name, default_item}));

  },
  async update(req, res){  // update item
    const { uuid, name, default_item} = req.body;
    res.json(await (new CPRPAssetsProviders).update(req.account, {uuid, name, default_item}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPAssetsProviders).remove(req.account, {uuid}));
  },

}
