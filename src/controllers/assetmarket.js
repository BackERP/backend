import CPRPAssetMarket from '../models/CPRPAssetMarket';




module.exports = {

  async get(req, res){ //get one 
    const {market, object_uuid} = req.query;

    res.json(await (new CPRPAssetMarket).get(market, object_uuid));
  },
}
