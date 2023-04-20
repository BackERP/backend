import CPRPBookRecords from '../models/CPRPBookRecords';



module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPBookRecords).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;

    res.json(await (new CPRPBookRecords).list(page, countItems));
  },

}
