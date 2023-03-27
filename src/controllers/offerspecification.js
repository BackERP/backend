import CPRPSaleDocumentSpecifications from '../models/CPRPSaleDocumentSpecifications';


module.exports = {

  async get(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await (new CPRPSaleDocumentSpecifications).get(uuid));
  },

  async list(req, res){  //get list
    const {page, countItems, document} = req.query;
    res.json(await (new CPRPSaleDocumentSpecifications).list(document, page, countItems));
  },

  async create(req, res){  // create item
    const { document,
            asset,
            assetProvider,
            assetMetaDataProvider,
            resource,
            metadataresource,
            quantity,
            price,
            sum,
            currency,
          } = req.body;
    res.json(await (new CPRPSaleDocumentSpecifications).create(req.account, { document,
                                                                              asset,
                                                                              assetProvider,
                                                                              assetMetaDataProvider,
                                                                              resource,
                                                                              metadataresource,
                                                                              quantity,
                                                                              price,
                                                                              sum,
                                                                              currency
                                                                            }
    ));

  },
  async update(req, res){  // update item
    const { uuid, document,
            asset,
            assetProvider,
            assetMetaDataProvider,
            resource,
            metadataresource,
            quantity,
            price,
            sum,
            currency,
          } = req.body;
    res.json(await (new CPRPSaleDocumentSpecifications).update(req.account, { uuid, 
                                                                              document,
                                                                              asset,
                                                                              assetProvider,
                                                                              assetMetaDataProvider,
                                                                              resource,
                                                                              metadataresource,
                                                                              quantity,
                                                                              price,
                                                                              sum,
                                                                              currency
                                                                            }
    ));

  },
  async remove(req, res){  // remove item
    const { uuid} = req.body;
    res.json(await (new CPRPSaleDocumentSpecifications).remove(req.account, {uuid}));
  },

}
