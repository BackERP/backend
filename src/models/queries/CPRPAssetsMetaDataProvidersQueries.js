
const PRPAssetsMetaDataProviders = require('../db').PRPAssetsMetaDataProviders;


export default class CPRPAssetsMetaDataProvidersQueries
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

