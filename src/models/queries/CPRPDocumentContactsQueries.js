const PRPDocuments = require('../db').PRPDocuments;
const PRPSubjects = require('../db').PRPSubjects;
const PRPSubjectSpecification = require('../db').PRPSubjectSpecification;
const PRPSubjectTypeContacts = require('../db').PRPSubjectTypeContacts;
const PRPAccounts = require('../db').PRPAccounts;
const PRPSubjectTypes = require('../db').PRPSubjectTypes;
const PRPTypeRelations = require('../db').PRPTypeRelations;
const PRPPersons = require('../db').PRPPersons;
const PRPCurrencies = require('../db').PRPCurrenciesQueries;





export default class CPRPDocumentContactsQueries
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
                            model: PRPDocuments
                            ,attributes: ['uuid', 'number', 'dateDoc', 'sum', 'external_number']
                            ,as: 'document_data'
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
                            model: PRPSubjectSpecification
                            ,attributes: ['uuid', 'description']
                            ,as: 'subject_specification_data'
                            ,required: true
                            ,include: [{
                               model: PRPSubjects
                              ,attributes: ['uuid', 'name', 'inner_name']
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
                            {
                               model: PRPSubjects
                              ,attributes: ['uuid', 'name', 'inner_name']
                              ,as: 'subsubject_data'
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
                                 model: PRPPersons
                                ,attributes: ['uuid', 'first_name', 'middle_name', 'last_name', 'birth_date', 'age']
                                ,as: 'person_data'
                                ,required: false
                                ,include: [{
                                   model: PRPAccounts
                                  ,attributes: ['uuid', 'login']
                                  ,as: 'createAccount_data'
                                  ,required: true
                                }]
                             },

                            {
                                 model: PRPAccounts
                                ,attributes: ['uuid', 'login']
                                ,as: 'createAccount_data'
                                ,required: true
                             },
                             {
                                model: PRPTypeRelations
                               ,attributes: ['uuid', 'name']
                               ,as: 'relation_data'
                               ,required: true
                             },

                           ]

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

