import CPRPSubjectTypeContacts from '../models/CPRPSubjectTypeContacts';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPSubjectTypeContacts).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;

    res.json(await (new CPRPSubjectTypeContacts).list(page, countItems));
  },


  async create(req, res){  // create item
    const { name } = req.body;
    res.json(await (new CPRPSubjectTypeContacts).create(req.account, {name}));

  },
  async update(req, res){  // update item
    const { uuid, name, subject, book } = req.body;
    res.json(await (new CPRPSubjectTypeContacts).update(req.account, {uuid, name}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPSubjectTypeContacts).remove(req.account, {uuid}));
  },

}
