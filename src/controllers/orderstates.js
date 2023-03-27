import CPRPBuyDocumentStates from '../models/CPRPBuyDocumentStates';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPBuyDocumentStates).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;
    res.json(await (new CPRPBuyDocumentStates).list(page, countItems));
  },

}
