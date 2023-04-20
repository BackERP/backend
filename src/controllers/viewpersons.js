import CRPRMDBPerson from '../models/representations/CRPRMDBPerson';




module.exports = {

  async get(req, res){ //get one 
    const {market, object_uuid} = req.query;

    res.json(await (new CRPRMDBPerson).get(market, object_uuid));
  },
  async save(req, res){ //get one 
    const {market, object_uuid, fields} = req.body;

    res.json(await (new CRPRMDBPerson).save(market, object_uuid, fields));
  },

}
