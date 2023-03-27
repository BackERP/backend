import CPRPAssetsResources from '../models/CPRPAssetsResources';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPAssetsResources).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems, asset} = req.query;
    res.json(await (new CPRPAssetsResources).list(asset, page, countItems));
  },


  async create(req, res){  // create item

    const { asset, provider, resource, default_item} = req.body;
    res.json(await (new CPRPAssetsResources).create(req.account, { asset, provider, resource, default_item}));

  },
  async update(req, res){  // update item
    const { uuid,  asset, provider, resource, default_item} = req.body;
    res.json(await (new CPRPAssetsResources).update(req.account, {uuid, asset, provider, resource, default_item}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPAssetsResources).remove(req.account, {uuid}));
  },

}
