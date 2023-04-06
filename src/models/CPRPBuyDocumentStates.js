const PRPBuyDocumentStates = require('./db').PRPBuyDocumentStates;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';





const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPBuyDocumentStates extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async get(uuid)
    {
      return this.request(PRPBuyDocumentStates
                         ,CPRPQueryLib.buy_document_states.items()
                         ,{uuid: uuid}
                        );

    }
    async list(page, countItems)
    {
      return this.pagination(PRPBuyDocumentStates
                         ,CPRPQueryLib.buy_document_states.items()
                         , {state: State.Active}
                         , countItems
                         , page
                        );

    }

}