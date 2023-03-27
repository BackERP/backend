import CPRPAssets from '../models/CPRPAssets';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPAssets).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems, asset} = req.query;
    res.json(await (new CPRPAssets).list(page, countItems));
  },


  async create(req, res){  // create item
    const { subject, subject_specification, name, description, mime} = req.body;
    res.json(await (new CPRPAssets).create(req.account, {subject, subject_specification, name, description, mime}));

  },
  async update(req, res){  // update item
    const { uuid, subject, subject_specification, name, description, mime} = req.body;
    res.json(await (new CPRPAssets).update(req.account, {uuid, subject, subject_specification, name, description, mime}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPAssets).remove(req.account, {uuid}));
  },

}
