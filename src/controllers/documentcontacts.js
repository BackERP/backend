import CPRPDocumentContacts from '../models/CPRPDocumentContacts';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPDocumentContacts).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;

    res.json(await (new CPRPDocumentContacts).list(page, countItems));
  },

  async create(req, res){  // create item
    const { document, subject, subject_specification, type, contact } = req.body;
    res.json(await (new CPRPDocumentContacts).create(req.account, {document, subject, subject_specification, type, contact}));

  },
  async update(req, res){  // update item
    const { uuid, document, subject, subject_specification, type, contact } = req.body;
    res.json(await (new CPRPDocumentContacts).update(req.account, {uuid, document, subject, subject_specification, type, contact}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPDocumentContacts).remove(req.account, {uuid}));
  },

}
