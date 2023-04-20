import CPRPBooks from '../models/CPRPBooks';



module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPBooks).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;

    res.json(await (new CPRPBooks).list(page, countItems));
  },


  async create(req, res){  // create item
    const { subject, name } = req.body;
    res.json(await (new CPRPBooks).create(req.account, {subject, name}));

  },
  async update(req, res){  // update item
    const { uuid, subject, name } = req.body;
    res.json(await (new CPRPBooks).update(req.account, {uuid, subject, name}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPBooks).remove(req.account, {uuid}));
  },

}
