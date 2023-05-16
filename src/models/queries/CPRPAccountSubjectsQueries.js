
const PRPAccountSubjects = require('../db').PRPAccountSubjects;
const PRPAccounts = require('../db').PRPAccounts;
const PRPSubjects = require('../db').PRPSubjects;
const PRPSubjectTypes = require('../db').PRPSubjectTypes;


export default class CPRPAccountSubjectsQueries
{
   static items()
   {
      return {
               attributes: ['uuid'],
                order: [
                         ['createdAt', 'DESC'], 
                       ], 
                raw: true,
                nest: true,
                include: [{
                            model: PRPAccounts
                            ,attributes: ['uuid', 'login']
                            ,as: 'account_data'
                            ,required: true
                          },
                          {
                            model: PRPSubjects
                            ,attributes: ['uuid', 'name', 'inner_name']
                            ,as: 'subject_data'
                            ,required: true
                            ,include: [{
                               model: PRPAccounts
                              ,attributes: ['uuid', 'login']
                              ,as: 'createAccount_data'
                              ,required: false
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

