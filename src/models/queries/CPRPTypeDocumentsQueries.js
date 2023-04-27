const PRPSubjects = require('../db').PRPSubjects;
const PRPAccounts = require('../db').PRPAccounts;
const PRPSubjectTypes = require('../db').PRPSubjectTypes;
const PRPBooks = require('../db').PRPBooks;


export default class CPRPTypeDocumentsQueries
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
                            ,attributes: ['uuid', 'name', 'inner_name']
                            ,as: 'subject_data'
                            ,required: false
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
                          {
                            model: PRPBooks
                            ,attributes: ['uuid', 'name']
                            ,as: 'book_data'
                            ,required: true
                          },
                       ]

             }
   }
}

