import CPRPDocumentSpecifications from '../models/CPRPDocumentSpecifications';



module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPDocumentSpecifications).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;

    res.json(await (new CPRPDocumentSpecifications).list(page, countItems));
  },


  async create(req, res){  // create item
    const { document,
            asset,
            asset_resource,
            asset_metadata_resource,
            quantity,
            price,
            sum,
            currency,
            source_record,
            control_record
          } = req.body;
    res.json(await (new CPRPDocumentSpecifications).create(req.account, { document,
                                                                          asset,
                                                                          asset_resource,
                                                                          asset_metadata_resource,
                                                                          quantity,
                                                                          price,
                                                                          sum,
                                                                          currency,
                                                                          source_record,
                                                                          control_record
                                                                        }));

  },
  async update(req, res){  // update item
    const { uuid, 
            document,
            asset,
            asset_resource,
            asset_metadata_resource,
            quantity,
            price,
            sum,
            currency,
            source_record,
            control_record
          } = req.body;
    res.json(await (new CPRPDocumentSpecifications).update(req.account, { uuid,  
                                                                          document,
                                                                          asset,
                                                                          asset_resource,
                                                                          asset_metadata_resource,
                                                                          quantity,
                                                                          price,
                                                                          sum,
                                                                          currency,
                                                                          source_record,
                                                                          control_record
                                                                        }));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPDocumentSpecifications).remove(req.account, {uuid}));
  },

}
