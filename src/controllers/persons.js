import CPRPPersons from '../models/CPRPPersons';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPPersons).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;
    res.json(await (new CPRPPersons).list(page, countItems));
  },


  async create(req, res){  // create item

    const { first_name, middle_name, last_name, birth_date} = req.body;
    res.json(await (new CPRPPersons).create(req.account, {first_name, middle_name, last_name, birth_date}));

  },
  async update(req, res){  // update item
    const { uuid, first_name, middle_name, last_name, birth_date} = req.body;
    res.json(await (new CPRPPersons).update(req.account, {uuid, first_name, middle_name, last_name, birth_date}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPPersons).remove(req.account, {uuid}));
  },

}
