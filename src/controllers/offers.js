import CPRPSaleDocuments from '../models/CPRPSaleDocuments';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPSaleDocuments).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;
    res.json(await (new CPRPSaleDocuments).list(page, countItems));
  },

  async create(req, res){  // create item
    const { number, dateDoc, subject, sum, currency } = req.body;
    res.json(await (new CPRPSaleDocuments).create(req.account, { number, dateDoc, subject, sum, currency }));

  },
  async createByAsset(req, res){
    const { assetResource, price, quantity, is_physic, price_physic } = req.body;
    res.json(await (new CPRPSaleDocuments).createByAsset(req.account, { assetResource, price, quantity, is_physic, price_physic }));

  },

  async update(req, res){  // update item
    const { uuid, number, dateDoc, subject, sum, currency } = req.body;
    res.json(await (new CPRPSaleDocuments).update(req.account, { uuid, number, dateDoc, subject, sum, currency }));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPSaleDocuments).remove(req.account, {uuid}));
  },

}
