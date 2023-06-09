const PRPDocuments = require('./db').PRPDocuments;
import {State} from './enums/State';
import {TypeContacts} from './enums/TypeContacts';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';
import CPRPSubjects from './CPRPSubjects';
import CPRPMarketOffers from './CPRPMarketOffers';
import CPRPDocumentContacts from './CPRPDocumentContacts';
import CPRPDocumentSpecifications from './CPRPDocumentSpecifications';
import { v4 as uuid } from 'uuid';
import {StateMarketOffer} from './enums/StateMarketOffer';





const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPDocuments extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async get(uuid)
    {
      return this.request(PRPDocuments                                          
                         ,CPRPQueryLib.documents.items()
                         ,{uuid: uuid}
                        );

    }
    async getNew(uuid)
    {
      return this.request(PRPDocuments                                          
                         ,CPRPQueryLib.documents.new_items()
                         ,{uuid: uuid}
                        );

    }
    async getNewData(uuid)
    {
      return this.requestData(PRPDocuments                                          
                         ,CPRPQueryLib.documents.new_items()
                         ,{uuid: uuid}
                        );

    }


    async getData(uuid)
    {
      return this.requestData(PRPDocuments
                         ,CPRPQueryLib.documents.items()
                         ,{uuid: uuid}
                        );

    }

    async list(page, countItems)
    {
      return this.pagination(PRPDocuments
                         ,CPRPQueryLib.documents.items()
                         , {state: State.Active}
                         , countItems
                         , page
                        );
    }

    async findOnMarketData(market, type)
    {

      return this.requestData(PRPDocuments
                         ,CPRPQueryLib.documents.items()
                         ,{ state: State.Active, 
                            uuid: {
                                     [Op.in]: Sequelize.literal("(select offer from PRPMarketOffers where market='"+ market + "' and stateMarket = " + StateMarketOffer.Active + ")")
                                   },
                            type: type

                          }
                        );

    }
   async findOnMarketBySubjectData(market, type, subject)
   {
      return this.requestData(PRPDocuments
                         ,CPRPQueryLib.documents.items()
                         ,{ state: State.Active, 
                            uuid: {
                                     [Op.in]: Sequelize.literal("(select offer from PRPMarketOffers where market='"+ market + "' and stateMarket = " + StateMarketOffer.Active + ")")
                                   },
                            type: type,
                            from_subject: subject,

                          }
                        );
   }

    async findOnMarketSameSubjectData(market, type, offer)
    {
      const sql = "(select offer from PRPMarketOffers "
                +" where market='"+ market + "' and stateMarket = " 
                + StateMarketOffer.Active 
                + " and offer in (select uuid from PRPDocuments where type = '" + type+ "' and from_subject in ("
                + " select from_subject from PRPDocuments where uuid ='" + offer + "')"
                + "))";
      return this.requestData(PRPDocuments
                         ,CPRPQueryLib.documents.items()
                         ,{ state: State.Active, 
                            uuid: {
                                     [Op.in]: Sequelize.literal(sql)
                                   },
                            type: type

                          }
                        );

    }


    async createTrn(t, account, obj)
    {
       return await PRPDocuments.create({ type: obj.type, 
                                          number: obj.number,
                                          dateDoc: obj.dateDoc,
                                          subject: obj.subject,
                                          subject_specification: obj.subject_specification,
                                          from_subject: obj.from_subject,
                                          from_subject_specification: obj.from_subject_specification,
                                          to_subject: obj.to_subject,
                                          to_subject_specification: obj.to_subject_specification,
                                          sum: obj.sum,
                                          currency: obj.currency,
                                          documentState: obj.documentState,
                                          external_number: obj.external_number,
                                          createdAt: new Date(),
                                          updatedAt: new Date()
                                        }, { transaction: t });
    }

    async create(account, type, documentState, market, currency, subjects, spec, contacts)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              if(subjects.to_subject_data !== undefined)
                 subjects.to_subject = await (new CPRPSubjects).getOrCreateTrn(t, account, subjects.from_subject, subjects.to_subject_data);

                 const documentObject = {
                       number: uuid(),
                       type: type,
                       dateDoc: new Date(),
                       subject: subjects.subject,
                       subject_specification: subjects.subject_specification,
                       from_subject: subjects.from_subject,
                       from_subject_specification: subjects.from_subject_specification,
                       to_subject: subjects.to_subject,
                       to_subject_specification: subjects.to_subject_specification,
                       sum: spec.reduce((total, pos)=>{return total + pos.quantity * pos.price},0),
                       currency: currency,
                       documentState:documentState,
                 }

              const objDoc = await this.createTrn(t, account, documentObject);
              if(market !== undefined)
                 await (new CPRPMarketOffers).setOfferTrn(t, account, market, objDoc.uuid, spec[0].asset);

              if(subjects.to_subject_data !== undefined)          
                await (new CPRPDocumentContacts).addToDocTrn(t, account, 
                                                                objDoc.uuid, 
                                                                subjects.to_subject, 
                                                                subjects.to_subject_specification, 
                                                                [{type:TypeContacts.Email, contact:subjects.to_subject_data.email},
                                                                 {type:TypeContacts.Phone, contact:subjects.to_subject_data.phone},
                                                                ]
                                                             );

              if(contacts)          
                await (new CPRPDocumentContacts).copyToDocTrn(t, account, objDoc.uuid, contacts);

              const objSpecs = await (new CPRPDocumentSpecifications).createBySpecTrn(t, 
                                                                                      type,
                                                                                      objDoc.uuid, 
                                                                                      subjects.subject,
                                                                                      subjects.subject_specification,
                                                                                      true, 
                                                                                      spec, 
                                                                                      account);
              return objDoc;
           });
           return {ok:true, data: {uuid: data.uuid}}
        }
        catch(err) {
            console.log(err.message);
            return {ok:false, error:err.message, data: null};
      }

    }

}