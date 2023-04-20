import CRPRMDBAsset from '../models/representations/CRPRMDBAsset';




module.exports = {

  async get(req, res){ //get one 
    const {market, object_uuid} = req.query;

    res.json(await (new CRPRMDBAsset).get(market, object_uuid));
  },
  async save(req, res){ //get one 
    const {market, object_uuid, fields} = req.body;

    res.json(await (new CRPRMDBAsset).save(market, object_uuid, fields));
  },



}
