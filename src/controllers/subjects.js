import CPRPSubjects from '../models/CPRPSubjects';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPSubjects).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;
    res.json(await (new CPRPSubjects).list(page, countItems));
  },


  async create(req, res){  // create item
    const { name, subject_type } = req.body;
    res.json(await (new CPRPSubjects).create(req.account, {name, subject_type}));

  },
  async update(req, res){  // update item
    const { uuid, name, subject_type} = req.body;
    res.json(await (new CPRPSubjects).update(req.account, {uuid, name, subject_type}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPSubjects).remove(req.account, {uuid}));
  },

}
