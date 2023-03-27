import CPRPSaleDocumentStates from '../models/CPRPSaleDocumentStates';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new PRPSaleDocumentStates).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;
    res.json(await (new PRPSaleDocumentStates).list(page, countItems));
  },

}
