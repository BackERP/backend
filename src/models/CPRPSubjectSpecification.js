const PRPSubjectSpecification = require('./db').PRPSubjectSpecification;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';




const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPSubjectSpecification extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async get(uuid)
    {
      return this.request(PRPSubjectSpecification
                         ,CPRPQueryLib.subject_specification.items()
                         ,{uuid: uuid}
                        );

    }
    async list(subject, page, countItems)
    {
      return this.pagination(PRPSubjectSpecification
                         ,CPRPQueryLib.subject_specification.items()
                         , {state: State.Active, subject: subject}
                         , countItems
                         , page
                        );
    }
    async findData(relation, subject, subsubject)
    {
      return this.requestData(PRPSubjectSpecification
                         ,CPRPQueryLib.subject_specification.items()
                         ,{state: State.Active, relation, subject, subsubject}
                        );

    }

    async createIsNotExistTrn(t, account, relation, subject, subsubject)
    {
       const subject_specifications = await this.findData(relation, subject, subsubject);
       if(subject_specifications.length > 0)
         return;
       return await createTrn(t, account, {relation, subject, subsubject});
    }
    async createTrn(t, account, obj)
    {
         return await PRPSubjectSpecification.create({  subject: obj.subject,
                                                        subsubject: obj.subsubject,
                                                        person: obj.person,
                                                        relation: obj.relation,
                                                        description: obj.description,
                                                        createAccount: account.uuid,
                                                        createdAt: new Date(),
                                                        updatedAt: new Date()
                                                      }, { transaction: t });
    }

    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              const objItem = await this.createTrn(t, account, obj);

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid, subject: data.subject_data, subsubject: data.subsubject_data, person: data.person_data, description: data.description}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async update(account, obj)
    {
      try{
           const asset = await PRPSubjectSpecification.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The subject specification is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPSubjectSpecification.update({  subject: obj.subject,
                                                                      subsubject: obj.subsubject,
                                                                      person: obj.person,
                                                                      relation: obj.relation,
                                                                      description: obj.description,
                                                                      updatedAt: new Date()
                                                                   }, 
                                                                   {where: {uuid: obj.uuid}},
                                                                   { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid, subject: data.subject_data, subsubject: data.subsubject_data, person: data.person_data, description: data.description}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async remove(account, obj)
    {
      try{
           const asset = await PRPSubjectSpecification.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The subject specification is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPSubjectSpecification.update({  state: State.Removed,
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