const PRPAccounts = require('../db').PRPAccounts;
const PRPSubjects = require('../db').PRPSubjects;
const PRPSubjectTypes = require('../db').PRPSubjectTypes;
const PRPSubjectTypeContacts = require('../db').PRPSubjectTypeContacts;
                                                                      

export default class CPRPSubjectContactsQueries
{
   static items()
   {
      return {
               attributes: ['uuid', 'contact'],
                order: [
                         ['createdAt', 'DESC'],
                       ], 
                raw: true,
                nest: true,
                include: [
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
 
                         {
                             model: PRPSubjectTypeContacts
                            ,attributes: ['uuid', 'name']
                            ,as: 'type_data'
                            ,required: true
                          },
                       ]

             }
   }
}

