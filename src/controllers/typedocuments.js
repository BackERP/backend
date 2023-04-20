import CPRPTypeDocuments from '../models/CPRPTypeDocuments';



module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPTypeDocuments).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;

    res.json(await (new CPRPTypeDocuments).list(page, countItems));
  },


  async create(req, res){  // create item
    const { name, subject, book } = req.body;
    res.json(await (new CPRPTypeDocuments).create(req.account, {name, subject, book}));

  },
  async update(req, res){  // update item
    const { uuid, name, subject, book } = req.body;
    res.json(await (new CPRPTypeDocuments).update(req.account, {uuid, name, subject, book}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPTypeDocuments).remove(req.account, {uuid}));
  },

}
