import CRPRMDBSubject from '../models/representations/CRPRMDBSubject';




module.exports = {

  async get(req, res){ //get one 
    const {market, object_uuid} = req.query;

    res.json(await (new CRPRMDBSubject).get(market, object_uuid));
  },
  async save(req, res){ //get one 
    const {market, object_uuid, fields} = req.body;

    res.json(await (new CRPRMDBSubject).save(market, object_uuid, fields));
  },

}
