import CPRPAssetsMetaDataResources from '../models/CPRPAssetsMetaDataResources';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPAssetsMetaDataResources).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems, asset} = req.query;
    res.json(await (new CPRPAssetsMetaDataResources).list(asset, page, countItems));
  },


  async create(req, res){  // create item

    const { asset, provider, resource, default_item} = req.body;
    res.json(await (new CPRPAssetsMetaDataResources).create(req.account, {asset, provider, resource, default_item}));

  },
  async update(req, res){  // update item
    const { uuid, asset, provider, resource, default_item} = req.body;
    res.json(await (new CPRPAssetsMetaDataResources).update(req.account, {uuid, asset, provider, resource, default_item}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPAssetsMetaDataResources).remove(req.account, {uuid}));
  },

}
