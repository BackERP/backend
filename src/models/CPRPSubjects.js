const PRPSubjects = require('./db').PRPSubjects;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';




const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPSubjects extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async get(uuid)
    {
      return this.request(PRPSubjects
                         ,CPRPQueryLib.subjects.items()
                         ,{uuid: uuid}
                        );

    }
    async list(page, countItems)
    {
      return this.pagination(PRPSubjects
                         ,CPRPQueryLib.subjects.items()
                         , {state: State.Active}
                         , countItems
                         , page
                        );

    }

    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              const objItem = await PRPSubjects.create({  name: obj.name,
                                                          subject_type: obj.subject_type,
                                                          show_main: obj.show_main,
                                                          order: obj.order,
                                                          createAccount: account.uuid,
                                                          createdAt: new Date(),
                                                          updatedAt: new Date()
                                                       }, { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid, name: data.name, subject_type: data.subject_type_data}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async update(account, obj)
    {
      try{
           const asset = await PRPSubjects.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The subject is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPSubjects.update({  name: obj.name,
                                                          subject_type: obj.subject_type,
                                                          show_main: obj.show_main,
                                                          order: obj.order,
                                                          updatedAt: new Date()
                                                       }, 
                                                       {where: {uuid: obj.uuid}},
                                                       { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid, name: data.name, subject_type: data.subject_type_data}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async remove(account, obj)
    {
      try{
           const asset = await PRPSubjects.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The subject is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPSubjects.update({  state: State.Removed,
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