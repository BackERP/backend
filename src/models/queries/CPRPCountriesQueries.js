export default class CPRPCountriesQueries
{
   static items()
   {
      return {
               attributes: ['uuid', 'name', 'alpha2', 'alpha3', 'numeric'],
                order: [
                         ['createdAt', 'DESC'],
                       ], 
                raw: true,
                nest: true,
             }
   }
}

