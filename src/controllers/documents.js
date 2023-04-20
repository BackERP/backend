import CPRPDocuments from '../models/CPRPDocuments';



module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPDocuments).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;

    res.json(await (new CPRPDocuments).list(page, countItems));
  },


  async create(req, res){  // create item
    const { type, 
            number,
            dateDoc,
            subject,
            subject_specification,
            from_subject,
            from_subject_specification,
            to_subject,
            to_subject_specification,
            sum,
            currency,
            documentState,
            external_number
          } = req.body;
    res.json(await (new CPRPDocuments).create(req.account, { type, 
                                                             number,
                                                             dateDoc,
                                                             subject,
                                                             subject_specification,
                                                             from_subject,
                                                             from_subject_specification,
                                                             to_subject,
                                                             to_subject_specification,
                                                             sum,
                                                             currency,
                                                             documentState,
                                                             external_number
                                                           }));

  },
  async update(req, res){  // update item
    const { uuid, 
            type, 
            number,
            dateDoc,
            subject,
            subject_specification,
            from_subject,
            from_subject_specification,
            to_subject,
            to_subject_specification,
            sum,
            currency,
            documentState,
            external_number
          } = req.body;
    res.json(await (new CPRPDocuments).update(req.account, { uuid, 
                                                             type, 
                                                             number,
                                                             dateDoc,
                                                             subject,
                                                             subject_specification,
                                                             from_subject,
                                                             from_subject_specification,
                                                             to_subject,
                                                             to_subject_specification,
                                                             sum,
                                                             currency,
                                                             documentState,
                                                             external_number
                                                           }));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPDocuments).remove(req.account, {uuid}));
  },

}
