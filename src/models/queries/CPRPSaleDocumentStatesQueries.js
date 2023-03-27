
const PRPSaleDocumentStates = require('../db').PRPSaleDocumentStates;



export default class CPRPSaleDocumentStatesQueries
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

