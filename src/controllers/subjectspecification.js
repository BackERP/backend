import CPRPSubjectSpecification from '../models/CPRPSubjectSpecification';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPSubjectSpecification).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems, subject} = req.query;
    res.json(await (new CPRPSubjectSpecification).list(subject, page, countItems));
  },


  async create(req, res){  // create item
    const { subject, subsubject, person, relation, description} = req.body;
    res.json(await (new CPRPSubjectSpecification).create(req.account, {subject, subsubject, person, relation, description}));

  },
  async update(req, res){  // update item
    const { uuid, subject, subsubject, person, relation, description} = req.body;
    res.json(await (new CPRPSubjectSpecification).update(req.account, {uuid, subject, subsubject, person, relation, description}));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPSubjectSpecification).remove(req.account, {uuid}));
  },

}
