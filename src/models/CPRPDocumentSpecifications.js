
const PRPDocumentSpecifications = require('./db').PRPDocumentSpecifications;


import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';




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

    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              const objItem = await PRPDocumentSpecifications.create({ document: obj.document,
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

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid, first_name: data.first_name, middle_name: data.middle_name, last_name: data.last_name}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async update(account, obj)
    {
      try{
           const asset = await PRPDocumentSpecifications.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The position of specification is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPDocumentSpecifications.update({ document: obj.document,
                                                                       asset: obj.asset,
                                                                       asset_resource: obj.asset_resource,
                                                                       asset_metadata_resource: obj.asset_metadata_resource,
                                                                       quantity: obj.quantity,
                                                                       price: obj.price,
                                                                       sum: obj.sum,
                                                                       currency: obj.currency,
                                                                       source_record: obj.source_record,
                                                                       control_record: obj.control_record,
                                                                       updatedAt: new Date()
                                                                    }, 
                                                                    {where: {uuid: obj.uuid}},
                                                                    { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid, first_name: data.first_name, middle_name: data.middle_name, last_name: data.last_name}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async remove(account, obj)
    {
      try{
           const asset = await PRPDocumentSpecifications.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The position of specification is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPDocumentSpecifications.update({  state: State.Removed,
                                                                        updatedAt: new Date()
                                                                     }, 
                                                                     {where: {uuid: obj.uuid}},
                                                                     { transaction: t });
              return objItem;                                      
           });
           return {ok:true, data: null}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
}