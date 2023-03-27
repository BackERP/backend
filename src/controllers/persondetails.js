import CPRPPersonDetails from '../models/CPRPPersonDetails';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPPersonDetails).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems, person} = req.query;
    res.json(await (new CPRPPersonDetails).list(person, page, countItems));
  },


  async create(req, res){  // create item
    const { person, name, photo, description, order} = req.body;
    res.json(await (new CPRPPersonDetails).create(req.account, {person, name, photo, description, order}));

  },
  async update(req, res){  // update item
    const { uuid, person, name, photo, description, order} = req.body;
    res.json(await (new CPRPPersonDetails).update(req.account, {uuid, person, name, photo, description, order}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPPersonDetails).remove(req.account, {uuid}));
  },

}
