import CPRPBuyDocumentSpecifications from '../models/CPRPBuyDocumentSpecifications';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPBuyDocumentSpecifications).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems, document} = req.query;
    res.json(await (new CPRPBuyDocumentSpecifications).list(document, page, countItems));
  },


  async create(req, res){  // create item
    const { name, 
            subject_type, 
            document, 
            asset, 
            assetProvider, 
            assetMetaDataProvider, 
            resource, 
            metadataresource, 
            quantity, 
            price, 
            sum, 
            currency, 
            source_registr 
          } = req.body;
    res.json(await (new CPRPBuyDocumentSpecifications).create(req.account, { document, 
                                                                             asset, 
                                                                             assetProvider, 
                                                                             assetMetaDataProvider, 
                                                                             resource, 
                                                                             metadataresource, 
                                                                             quantity, 
                                                                             price, 
                                                                             sum, 
                                                                             currency, 
                                                                             source_registr
                                                                            }
     ));

  },
  async update(req, res){  // update item
    const { uuid, 
            name, 
            subject_type, 
            document, 
            asset, 
            assetProvider, 
            assetMetaDataProvider, 
            resource, 
            metadataresource, 
            quantity, 
            price, 
            sum, 
            currency, 
            source_registr 
          } = req.body;
    res.json(await (new CPRPBuyDocumentSpecifications).update(req.account, { uuid, 
                                                                             document, 
                                                                             asset, 
                                                                             assetProvider, 
                                                                             assetMetaDataProvider, 
                                                                             resource, 
                                                                             metadataresource, 
                                                                             quantity, 
                                                                             price, 
                                                                             sum, 
                                                                             currency, 
                                                                             source_registr
                                                                            }
   ));
  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPBuyDocumentSpecifications).remove(req.account, {uuid}));
  },

}
