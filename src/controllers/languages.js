import CPRPLanguages from '../models/CPRPLanguages';

module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPLanguages).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;

    res.json(await (new CPRPLanguages).list(page, countItems));
  },


  async create(req, res){  // create item
    const { name, short } = req.body;
    res.json(await (new CPRPLanguages).create(req.account, {name, short}));

  },
  async update(req, res){  // update item
    const { uuid, name, short } = req.body;
    res.json(await (new CPRPLanguages).update(req.account, {uuid, name, short}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPLanguages).remove(req.account, {uuid}));
  },

}
