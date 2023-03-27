const PRPSubjectTypeAttributes = require('./db').PRPSubjectTypeAttributes;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';
import {ConvertTypeValue} from './config/type_value';




const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPSubjectTypeAttributes extends CPRPQuery
{

    constructor()
    {
       super();
    }

    async convertData(records)
    {
       return records.map(obj=>{obj.type_value = ConvertTypeValue.getByInt(obj.type_value); return obj;});
    }


    async get(uuid)
    {
      return this.request(PRPSubjectTypeAttributes
                         ,CPRPQueryLib.subject_type_attributes.items()
                         ,{uuid: uuid}
                         ,this.convertData
                        );

    }
    async list(subjecttype, page, countItems)
    {
      return this.pagination(PRPSubjectTypeAttributes
                         ,CPRPQueryLib.subject_type_attributes.items()
                         , {state: State.Active, type:subjecttype}
                         , countItems
                         , page
                         ,this.convertData
                        );
    }

    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              const objItem = await PRPSubjectTypeAttributes.create({ name: obj.name,
                                                                      type: obj.type,
                                                                      type_value: ConvertTypeValue.getByString(obj.type_value),
                                                                      order: obj.order,
                                                                      createdAt: new Date(),
                                                                      updatedAt: new Date()
                                                                   }, { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid, name: data.name, type: data.type_data, type_value: data.type_value, order: data.order}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async update(account, obj)
    {
    try{
           const asset = await PRPSubjectTypeAttributes.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The subject type attribute is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPSubjectTypeAttributes.update({ name: obj.name,
                                                                      type: obj.type,
                                                                      type_value: ConvertTypeValue.getByString(obj.type_value),
                                                                      order: obj.order,
                                                                      updatedAt: new Date()
                                                                   }, 
                                                                   {where: {uuid: obj.uuid}},
                                                                   { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid, name: data.name, type: data.type_data, type_value: data.type_value, order: data.order}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async remove(account, obj)
    {
      try{
           const asset = await PRPSubjectTypeAttributes.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The subject type attribute is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPSubjectTypeAttributes.update({  state: State.Removed,
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