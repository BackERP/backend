
const PRPCurrencies = require('../db').PRPCurrenciesQueries;



export default class CPRPCurrenciesQueries
{
   static items()
   {
      return {
               attributes: ['uuid', 'name', 'code'],
                order: [
                         ['createdAt', 'DESC'], 
                       ], 
                raw: true,
                nest: true,
             }
   }
}

