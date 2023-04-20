import CPRPDocumentStates from '../models/CPRPDocumentStates';



module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPDocumentStates).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;

    res.json(await (new CPRPDocumentStates).list(page, countItems));
  },


  async create(req, res){  // create item
    const { name, type, operation } = req.body;
    res.json(await (new CPRPDocumentStates).create(req.account, {name, type, operation}));

  },
  async update(req, res){  // update item
    const { uuid, name, type, operation } = req.body;
    res.json(await (new CPRPDocumentStates).update(req.account, {uuid, name, type, operation}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPDocumentStates).remove(req.account, {uuid}));
  },

}
