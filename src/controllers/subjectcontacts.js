import CPRPSubjectContacts from '../models/CPRPSubjectContacts';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPSubjectContacts).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;

    res.json(await (new CPRPSubjectContacts).list(page, countItems));
  },


  async create(req, res){  // create item
    const { subject, type, contact  } = req.body;
    res.json(await (new CPRPSubjectContacts).create(req.account, {subject, type, contact}));

  },
  async update(req, res){  // update item
    const { uuid, subject, type, contact } = req.body;
    res.json(await (new CPRPSubjectContacts).update(req.account, {uuid, subject, type, contact}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPSubjectContacts).remove(req.account, {uuid}));
  },

}
