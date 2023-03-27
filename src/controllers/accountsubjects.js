import CPRPAccountSubjects from '../models/CPRPAccountSubjects';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPAccountSubjects).get(req.account, uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;
    res.json(await (new CPRPAccountSubjects).list(req.account, page, countItems));
  },


  async create(req, res){  // create item

    const {subject} = req.body;
    res.json(await (new CPRPAccountSubjects).create(req.account, {name, subject}));

  },
  async update(req, res){  // update item
    const { uuid, subject} = req.body;
    res.json(await (new CPRPAccountSubjects).update(req.account, {uuid, subject}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPAccountSubjects).remove(req.account, {uuid}));
  },

}
