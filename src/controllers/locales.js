import CPRPLocales from '../models/CPRPLocales';

module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPLocales).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;

    res.json(await (new CPRPLocales).list(page, countItems));
  },


  async create(req, res){  // create item
    const { name, region, language } = req.body;
    res.json(await (new CPRPLocales).create(req.account, {name, region, language}));

  },
  async update(req, res){  // update item
    const { uuid, name, region, language } = req.body;
    res.json(await (new CPRPLocales).update(req.account, {uuid, name, region, language}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPLocales).remove(req.account, {uuid}));
  },

}
