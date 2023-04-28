import CPRPMarketPoint from '../models/CPRPMarketPoint';





module.exports = {


  async main(req, res){ //get one 
     res.json(await (new CPRPMarketPoint).main(req.params.marketplace));
  },
  async creation(req, res){ //get one 
     const {offer} = req.query;
     res.json(await (new CPRPMarketPoint).creation(req.params.marketplace, offer));
  },
  async organization(req, res){ //get one       in
     const {subject} = req.query;
     res.json(await (new CPRPMarketPoint).organization(req.params.marketplace, subject));
  },


}

