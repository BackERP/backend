import CPRPSubjectAttributes from '../models/CPRPSubjectAttributes';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPSubjectAttributes).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems, subject} = req.query;
    res.json(await (new CPRPSubjectAttributes).list(subject, page, countItems));
  },


  async create(req, res){  // create item

    const { subject, attribute, text_value, string_value, integer_value, double_value} = req.body;
    res.json(await (new CPRPSubjectAttributes).create(req.account, {subject, attribute, text_value, string_value, integer_value, double_value}));

  },
  async update(req, res){  // update item
    const { uuid, subject, attribute, text_value, string_value, integer_value, double_value} = req.body;
    res.json(await (new CPRPSubjectAttributes).update(req.account, {uuid, subject, attribute, text_value, string_value, integer_value, double_value}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPSubjectAttributes).remove(req.account, {uuid}));
  },

}
