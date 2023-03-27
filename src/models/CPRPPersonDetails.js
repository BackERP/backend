const PRPPersonDetails = require('./db').PRPPersonDetails;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';




const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPPersonDetails extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async get(uuid)
    {
      return this.request(PRPPersonDetails
                         ,CPRPQueryLib.person_details.items()
                         ,{uuid: uuid}
                        );

    }
    async list(person, page, countItems)
    {
      return this.pagination(PRPPersonDetails
                         ,CPRPQueryLib.person_details.items()
                         , {state: State.Active, person: person}
                         , countItems
                         , page
                        );
    }
    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              const objItem = await PRPPersonDetails.create({  person: obj.person,
                                                               name:obj.name,
                                                               photo:obj.photo,
                                                               description:obj.description,
                                                               order:obj.order,
                                                               createdAt: new Date(),
                                                               updatedAt: new Date()
                                                             }, { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid, person: data.person_data, name: data.name, photo: data.photo, description: data.description, order: data.order}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async update(account, obj)
    {
      try{
           const asset = await PRPPersonDetails.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The person detail is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPPersonDetails.update({  person: obj.person,
                                                               name:obj.name,
                                                               photo:obj.photo,
                                                               description:obj.description,
                                                               order:obj.order,
                                                               updatedAt: new Date()
                                                             }, 
                                                             {where: {uuid: obj.uuid}},
                                                             { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid, person: data.person_data, name: data.name, photo: data.photo, description: data.description, order: data.order}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async remove(account, obj)
    {
      try{
           const asset = await PRPPersonDetails.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The person detail is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPPersonDetails.update({  state: State.Removed,
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