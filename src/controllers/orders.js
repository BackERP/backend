import CPRPBuyDocuments from '../models/CPRPBuyDocuments';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPBuyDocuments).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;
    res.json(await (new CPRPBuyDocuments).list(page, countItems));
  },


  async create(req, res){  // create item
    const {number, dateDoc, email, sum, currency, documentState} = req.body;
    res.json(await (new CPRPBuyDocuments).create(req.account, {number, dateDoc, email, sum, currency, documentState}));

  },

  async createByRegistr(req, res){  // create item
    const {email, source_registr, quantity} = req.body;
    res.json(await (new CPRPBuyDocuments).createByRegistr({email, source_registr, quantity}));
  },
  async createByTCart(req, res){  // create item
    res.json(await (new CPRPBuyDocuments).createByTCart(req.body));
  },



  async update(req, res){  // update item
    const { uuid, number, dateDoc, email, sum, currency, documentState} = req.body;
    res.json(await (new CPRPBuyDocuments).update(req.account, {uuid, number, dateDoc, email, sum, currency, documentState}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPBuyDocuments).remove(req.account, {uuid}));
  },

}
