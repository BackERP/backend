
const PRPDocumentSpecifications = require('./db').PRPDocumentSpecifications;
import { map } from 'modern-async'


import {State} from './enums/State';
import {StateMarketOffer} from './enums/StateMarketOffer';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';
import CPRPBookRecords from './CPRPBookRecords';



const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;





export default class CPRPDocumentSpecifications extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async get(uuid)
    {
      return this.request(PRPDocumentSpecifications
                         ,CPRPQueryLib.document_specifications.items()
                         ,{uuid: uuid}
                        );

    }
    async list(page, countItems)
    {
      return this.pagination(PRPDocumentSpecifications
                         ,CPRPQueryLib.document_specifications.items()
                         , {state: State.Active}
                         , countItems
                         , page
                        );
    }
    async listData(document)
    {
      return this.requestData(PRPDocumentSpecifications
                         ,CPRPQueryLib.document_specifications.items()
                         , {state: State.Active, document: document}
                        );
    }

    async getBySpec(spec)
    {
      return this.requestData(PRPDocumentSpecifications
                         ,CPRPQueryLib.document_specifications.items()
                         ,{uuid: {
                                     [Op.in]: spec//: {[Op.like]: '%A%'}
                                 }
                          }
                        );

    }
    async findAssetMarketData(market, asset, asset_resource)
    {
      return this.requestData(PRPDocumentSpecifications
                         ,CPRPQueryLib.document_specifications.items()
                         ,{ state: State.Active, 
                            asset, 
                            asset_resource, 
                            document: {
                                     [Op.in]: Sequelize.literal("(select offer from PRPMarketOffers where market='"+ market + "' and stateMarket = " + StateMarketOffer.Active + ")")
                                   }

                          }
                        );

    }

    async createTrn(t, account, obj)
    {
      return await PRPDocumentSpecifications.create({ document: obj.document,
                                                      asset: obj.asset,
                                                      asset_resource: obj.asset_resource,
                                                      asset_metadata_resource: obj.asset_metadata_resource,
                                                      quantity: obj.quantity,
                                                      price: obj.price,
                                                      sum: obj.sum,
                                                      currency: obj.currency,
                                                      source_record: obj.source_record,
                                                      control_record: obj.control_record,
                                                      createdAt: new Date(),
                                                      updatedAt: new Date()
                                                     }, { transaction: t });
    }


     async createBySpecTrn(t, type, document, subject, subject_specification, isRegist, spec, account)
     {
         return await map(spec, async (itemSpc)=>{
            const objSpc = await this.createTrn(t, account, { document: document,
                                                              asset: itemSpc.asset,
                                                              asset_resource: itemSpc.asset_resource,
                                                              asset_metadata_resource: itemSpc.asset_metadata_resource,
                                                              quantity: itemSpc.quantity,
                                                              price: itemSpc.price,
                                                              sum: itemSpc.quantity*itemSpc.price,
                                                              currency: itemSpc.currency,
                                                              source_record: itemSpc.source_record,
                                                              control_record: itemSpc.control_record,
                                                           }
                                              );

            if(isRegist)
               await (new CPRPBookRecords).createBySpecTrn(t, type, document, subject, subject_specification, objSpc.uuid, itemSpc, account);

            return objSpc;
         });
     }


}