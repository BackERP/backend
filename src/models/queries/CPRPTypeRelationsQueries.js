
const PRPTypeRelations = require('../db').PRPTypeRelations;




export default class CPRPTypeRelationsQueries
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

