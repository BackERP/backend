const PRPBookRecords = require('./db').PRPBookRecords;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';




const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPBookRecords extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async get(uuid)
    {
      return this.request(PRPBookRecords
                         ,CPRPQueryLib.book_records.items()
                         ,{uuid: uuid}
                        );

    }
    async list(page, countItems)
    {
      return this.pagination(PRPBookRecords
                         ,CPRPQueryLib.book_records.items()
                         , {state: State.Active}
                         , countItems
                         , page
                        );
    }

    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              const objItem = await PRPBookRecords.create({  book: obj.book,
                                                             reg_number: obj.reg_number,
                                                             dateReg: obj.dateReg,
                                                             subject: obj.subject,
                                                             subject_specification: obj.subject_specification,
                                                             pre_record: obj.pre_record,
                                                             next_record: obj.next_record,
                                                             asset: obj.asset,
                                                             asset_resource: obj.asset_resource,
                                                             asset_metadata_resource: obj.asset_metadata_resource,
                                                             price: obj.price,
                                                             quantity: obj.quantity,
                                                             sum: obj.sum,
                                                             currency: obj.currency,
                                                             reg_document: obj.reg_document,
                                                             reg_specification: obj.reg_specification,
                                                             base_record: obj.base_record,
                                                             issue_record: obj.issue_record,
                                                             master_record: obj.master_record,
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
}