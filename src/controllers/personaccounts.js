import CPRPPersonAccounts from '../models/CPRPPersonAccounts';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPPersonAccounts).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;
    res.json(await (new CPRPPersonAccounts).list(page, countItems));
  },


  async create(req, res){  // create item
    const { person} = req.body;
    res.json(await (new CPRPPersonAccounts).create(req.account, {person}));

  },
  async update(req, res){  // update item
    const { uuid, person} = req.body;
    res.json(await (new CPRPPersonAccounts).update(req.account, {uuid, person}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPPersonAccounts).remove(req.account, {uuid}));
  },

}
