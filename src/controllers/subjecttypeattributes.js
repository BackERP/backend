import CPRPSubjectTypeAttributes from '../models/CPRPSubjectTypeAttributes';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPSubjectTypeAttributes).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems, subjecttype} = req.query;
    res.json(await (new CPRPSubjectTypeAttributes).list(subjecttype, page, countItems));
  },


  async create(req, res){  // create item
    const { name, type, type_value, order} = req.body;
    res.json(await (new CPRPSubjectTypeAttributes).create(req.account, {name, type, type_value, order}));

  },
  async update(req, res){  // update item
    const { uuid, name, type, type_value, order} = req.body;
    res.json(await (new CPRPSubjectTypeAttributes).update(req.account, {uuid, name, type, type_value, order}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPSubjectTypeAttributes).remove(req.account, {uuid}));
  },

}
