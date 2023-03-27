
const PRPSubjectTypeAttributes = require('../db').PRPSubjectTypeAttributes;

const PRPSubjectTypes = require('../db').PRPSubjectTypes;






export default class CPRPSubjectTypeAttributesQueries
{
   static items()
   {
      return {
               attributes: ['uuid', 'name', 'type_value', 'order'],
                order: [
                         ['createdAt', 'DESC'], 
                       ], 
                raw: true,
                nest: true,
                include: [{
                            model: PRPSubjectTypes
                            ,attributes: ['uuid', 'name']
                            ,as: 'type_data'
                            ,required: true
                         }]
             }
   }
}

