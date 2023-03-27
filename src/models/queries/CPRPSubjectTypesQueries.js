
const PRPSubjectTypes = require('../db').PRPSubjectTypes;




export default class CPRPSubjectTypesQueries
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

