const PRPSubjectAttributes = require('./db').PRPSubjectAttributes;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';
import {ConvertTypeValue} from './config/type_value';





const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPSubjectAttributes extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async convertData(records)
    {
       return records.map(obj=>{obj.attribute_data.type_value = ConvertTypeValue.getByInt(obj.attribute_data.type_value); return obj;});
    }

    async get(uuid)
    {
      return this.request(PRPSubjectAttributes
                         ,CPRPQueryLib.subject_attributes.items()
                         ,{uuid: uuid}
                         ,this.convertData
                        );

    }
    async list(subject, page, countItems)
    {
      return this.pagination(PRPSubjectAttributes
                         ,CPRPQueryLib.subject_attributes.items()
                         , {state: State.Active, subject: subject}
                         , countItems
                         , page
                         ,this.convertData
                        );
    }

    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              const objItem = await PRPSubjectAttributes.create({  subject: obj.subject,
                                                                   attribute:obj.attribute,
                                                                   text_value:obj.text_value,
                                                                   string_value:obj.string_value,
                                                                   integer_value:obj.integer_value,
                                                                   double_value:obj.double_value,
                                                                   createdAt: new Date(),
                                                                   updatedAt: new Date()
                                                             }, { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid, subject: data.subject_data, attribute: data.attribute_data, text_value: data.text_value, string_value: data.string_value, integer_value: data.integer_value, double_value: data.double_value}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async update(account, obj)
    {
      try{
           const asset = await PRPSubjectAttributes.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The subject attribute is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPSubjectAttributes.update({  subject: obj.subject,
                                                                   attribute:obj.attribute,
                                                                   text_value:obj.text_value,
                                                                   string_value:obj.string_value,
                                                                   integer_value:obj.integer_value,
                                                                   double_value:obj.double_value,
                                                                   updatedAt: new Date()
                                                             }, 
                                                             {where: {uuid: obj.uuid}},
                                                             { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid, person: data.subject_data, attribute: data.attribute_data, text_value: data.text_value, string_value: data.string_value, integer_value: data.integer_value, double_value: data.double_value}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async remove(account, obj)
    {
      try{
           const asset = await PRPSubjectAttributes.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The subject attribute is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPSubjectAttributes.update({  state: State.Removed,
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