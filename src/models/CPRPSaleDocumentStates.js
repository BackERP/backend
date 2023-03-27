const PRPSaleDocumentStates = require('./db').PRPSaleDocumentStates;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';




const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;



export default class CPRPSaleDocumentStates extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async get(uuid)
    {
      return this.request(PRPSaleDocumentStates
                         ,CPRPQueryLib.sale_document_states.items()
                         ,{uuid: uuid}
                        );

    }
    async list(page, countItems)
    {
      return this.pagination(PRPSaleDocumentStates
                         ,CPRPQueryLib.sale_document_states.items()
                         , {state: State.Active}
                         , countItems
                         , page
                        );

    }
}