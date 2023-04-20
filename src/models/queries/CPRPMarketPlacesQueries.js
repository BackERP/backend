

export default class CPRPMarketPlacesQueries
{
   static items()
   {
      return {
               attributes: ['uuid', 'name', 'url'],
                order: [
                         ['createdAt', 'DESC'],
                       ], 
                raw: true,
                nest: true,
             }
   }
}

