
const PRPAccounts = require('../db').PRPAccounts;
const PRPSubjects = require('../db').PRPSubjects;
const PRPSubjectTypes = require('../db').PRPSubjectTypes;






export default class CPRPSubjectsQueries
{
   static items()
   {
      return {
               attributes: ['uuid', 'name', 'show_main', 'order', 'inner_name'],
                order: [
                         ['createdAt', 'DESC'], 
                       ], 
                raw: true,
                nest: true,
                include: [{
                            model: PRPAccounts
                           ,attributes: ['uuid', 'login']
                           ,as: 'createAccount_data'
                           ,required: true
                         },
                         {
                            model: PRPSubjectTypes
                           ,attributes: ['uuid', 'name']
                           ,as: 'subject_type_data'
                           ,required: true
                         }]
             }
   }
}

