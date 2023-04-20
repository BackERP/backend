
export default class CPRPLanguagesQueries
{
   static items()
   {
      return {
               attributes: ['uuid', 'name', 'short'],
                order: [
                         ['createdAt', 'DESC'],
                       ], 
                raw: true,
                nest: true,
             }
   }
}

