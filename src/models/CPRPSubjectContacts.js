const PRPSubjectContacts = require('./db').PRPSubjectContacts;
import { map } from 'modern-async'

import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';



const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPSubjectContacts extends CPRPQuery
{
    constructor()
    {                            
      super();
    }
    async get(uuid)
    {
      return this.request(PRPSubjectContacts
                         ,CPRPQueryLib.subject_contacts.items()
                         ,{uuid: uuid}
                        );

    }
    async list(page, countItems)
    {
      return this.pagination(PRPSubjectContacts
                         ,CPRPQueryLib.subject_contacts.items()
                         , {state: State.Active}
                         , countItems
                         , page
                        );
    }
    async findData(subject, type, contact)
    {
      return this.requestData(PRPSubjectContacts
                         ,CPRPQueryLib.subject_contacts.items()
                         ,{state: State.Active, subject, type, contact}
                        );

    }

    async createIsNotExistTrn(t, account, subject, contacts)
    {
        return await map(contacts, async (contact)=>{
          const data = await this.findData(subject, contact.type, contact.contact);
          if(data.length == 0)
            return await this.createTrn(t, account, {subject, type:contact.type, contact: contact.contact})
        });
    }

    async createTrn(t, account, obj)
    {
        return await PRPSubjectContacts.create({  subject: obj.subject,
                                                  type:obj.type,
                                                  contact:obj.contact,
                                                  createdAt: new Date(),
                                                  updatedAt: new Date()
                                                }, { transaction: t });
    }

    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              return await this.createTrn(t, account, obj);                                      
           });
           return {ok:true, data: {uuid: data.uuid}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async update(account, obj)
    {
      try{
           const asset = await PRPSubjectContacts.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The contact of subject is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPSubjectContacts.update({ subject: obj.subject,
                                                                type:obj.type,
                                                                contact:obj.contact,
                                                                updatedAt: new Date()
                                                               }, 
                                                               {where: {uuid: obj.uuid}},
                                                               { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async remove(account, obj)
    {
      try{
           const asset = await PRPSubjectContacts.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The contact of subject is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPSubjectContacts.update({  state: State.Removed,
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