import CPRPOperations from '../models/CPRPOperations';

module.exports = {


  async issueAll(req, res){  // issue all 
    res.json(await (new CPRPOperations).issueAll(req.account));
  },

  async issue(req, res){  // issue
    const { asset,  price, quantity, currency } = req.body;
    res.json(await (new CPRPOperations).issue(req.account, {asset,  price, quantity, currency}));
  },
  async incomeAll(req, res){  // income all
    res.json(await (new CPRPOperations).incomeAll(req.account));
  },
  async income(req, res){  // income
    const { asset, price, quantity, currency } = req.body;
    res.json(await (new CPRPOperations).income(req.account, {asset, price, quantity, currency}));
  },
  async makeOffer(req, res){  // create offer
    const { market, asset, price, currency, quantity, price_original } = req.body;
    res.json(await (new CPRPOperations).makeOffer(req.account, {market, asset, price, currency, quantity, price_original}));
  },
  async makeReserve(req, res){  // create reserve
    const { asset, quantity} = req.body;
    res.json(await (new CPRPOperations).makeReserve(req.account, {asset, quantity}));
  },
  async freeReserve(req, res){  // free reserve
    const { asset, quantity} = req.body;
    res.json(await (new CPRPOperations).freeReserve(req.account, {asset, quantity}));
  },
  async makeOrder(req, res){  // make order
    const { source, quantity, fullname, email, phone, order_number} = req.body;
    res.json(await (new CPRPOperations).makeOrder(req.account, { source, quantity, fullname, email, phone, order_number}));
  },
  async makePaid(req, res){  // make paid
    const { order_number, sum, currency} = req.body;
    res.json(await (new CPRPOperations).makePaid(req.account, {order_number, sum, currency}));
  },
  async makeReturn(req, res){  // make return
    const { source, quantity} = req.body;
    res.json(await (new CPRPOperations).makeOrder(req.account, { source, quantity}));
  },




}
