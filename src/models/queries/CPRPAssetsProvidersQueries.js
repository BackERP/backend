
const PRPAssetsProviders = require('../db').PRPAssetsProviders;


export default class CPRPAssetsProvidersQueries
{
   static items()
   {
      return {
               attributes: ['uuid', 'name', 'default_item'],
                order: [
                         ['createdAt', 'DESC'], 
                       ], 
                raw: true,
                nest: true,
             }
   }
}

