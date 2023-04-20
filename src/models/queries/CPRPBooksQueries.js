const PRPSubjects = require('../db').PRPSubjects;
const PRPAccounts = require('../db').PRPAccounts;
const PRPSubjectTypes = require('../db').PRPSubjectTypes;


export default class CPRPBooksQueries
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
                include: [
                          {
                            model: PRPSubjects
                            ,attributes: ['uuid', 'name']
                            ,as: 'subject_data'
                            ,required: true
                            ,include: [{
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
                          },
                       ]

             }
   }
}

