
const PRPBuyDocumentStates = require('../db').PRPBuyDocumentStates;



export default class CPRPBuyDocumentStatesQueries
{
   static items()
   {
      return {
               attributes: ['uuid', 'name'],
                order: [
                         ['createdAt', 'DESC'], 
                       ], 
                raw: true,
                nest: true,
             }
   }
}

