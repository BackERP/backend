
const PRPBooks = require('./db').PRPBooks;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';




const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPBooks extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async get(uuid)
    {
      return this.request(PRPBooks
                         ,CPRPQueryLib.books.items()
                         ,{uuid: uuid}
                        );

    }
    async list(page, countItems)
    {
      return this.pagination(PRPBooks
                         ,CPRPQueryLib.books.items()
                         , {state: State.Active}
                         , countItems
                         , page
                        );
    }

    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              const objItem = await PRPBooks.create({ subject: obj.subject,
                                                      name:obj.name,
                                                      createdAt: new Date(),
                                                      updatedAt: new Date()
                                                     }, { transaction: t });

              return objItem;                                      
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
           const asset = await PRPBooks.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The book is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPBooks.update({ subject: obj.subject,
                                                      name:obj.name,
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
           const asset = await PRPBooks.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The book is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPBooks.update({  state: State.Removed,
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