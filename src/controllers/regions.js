import CPRPRegions from '../models/CPRPRegions';

module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPRegions).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;

    res.json(await (new CPRPRegions).list(page, countItems));
  },


  async create(req, res){  // create item
    const { name, parent, country } = req.body;
    res.json(await (new CPRPRegions).create(req.account, {name, parent, country}));

  },
  async update(req, res){  // update item
    const { uuid, parent, country } = req.body;
    res.json(await (new CPRPRegions).update(req.account, {uuid, name, parent, country}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPRegions).remove(req.account, {uuid}));
  },

}
