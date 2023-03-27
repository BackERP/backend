import CPRPSubjectTypes from '../models/CPRPSubjectTypes';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPSubjectTypes).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;

    res.json(await (new CPRPSubjectTypes).list(page, countItems));
  },


  async create(req, res){  // create item
    const { name } = req.body;
    res.json(await (new CPRPSubjectTypes).create(req.account, {name}));

  },
  async update(req, res){  // update item
    const { uuid, name } = req.body;
    res.json(await (new CPRPSubjectTypes).update(req.account, {uuid, name}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPSubjectTypes).remove(req.account, {uuid}));
  },

}
