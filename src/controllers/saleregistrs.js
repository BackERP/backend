import CPRPSaleRegistrs from '../models/CPRPSaleRegistrs';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPSaleRegistrs).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;
    res.json(await (new CPRPSaleRegistrs).list(page, countItems));
  },

}
