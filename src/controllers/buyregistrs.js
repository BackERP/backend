import CPRPBuyRegistrs from '../models/CPRPBuyRegistrs';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPBuyRegistrs).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;
    res.json(await (new CPRPBuyRegistrs).list(page, countItems));
  },

}
