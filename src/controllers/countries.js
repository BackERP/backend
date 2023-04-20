import CPRPCountries from '../models/CPRPCountries';

module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPCountries).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;

    res.json(await (new CPRPCountries).list(page, countItems));
  },


  async create(req, res){  // create item
    const { name, alpha2, alpha3, numeric } = req.body;
    res.json(await (new CPRPCountries).create(req.account, {name, alpha2, alpha3, numeric}));

  },
  async update(req, res){  // update item
    const { uuid, name, alpha2, alpha3, numeric } = req.body;
    res.json(await (new CPRPCountries).update(req.account, {uuid, name, alpha2, alpha3, numeric}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPCountries).remove(req.account, {uuid}));
  },

}
