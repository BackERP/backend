const PRPTypeDocuments = require('../db').PRPTypeDocuments;
const PRPDocumentStates = require('../db').PRPDocumentStates;
const PRPAccounts = require('../db').PRPAccounts;
const PRPSubjects = require('../db').PRPSubjects;
const PRPSubjectTypes = require('../db').PRPSubjectTypes;
const PRPSubjectSpecification = require('../db').PRPSubjectSpecification;
const PRPTypeRelations = require('../db').PRPTypeRelations;
const PRPPersons = require('../db').PRPPersons;
const PRPCurrencies = require('../db').PRPCurrencies;


export default class CPRPDocumentsQueries
{
   static new_items()
   {
      return {
               attributes: ['uuid', 'number', 'dateDoc', 'sum', 'external_number'],
                order: [
                         ['createdAt', 'DESC'],
                       ], 
                raw: true,
                nest: true,
             }
   }
   static items()
   {
      return {
               attributes: ['uuid', 'number', 'dateDoc', 'sum', 'external_number'],
                order: [
                         ['createdAt', 'DESC'],
                       ], 
                raw: true,
                nest: true,

                include: [
                          {
                            model: PRPTypeDocuments
                            ,attributes: ['uuid', 'name']
                            ,as: 'type_data'
                            ,required: true
                          },


                          {
                            model: PRPSubjectSpecification
                            ,attributes: ['uuid', 'description']
                            ,as: 'subject_specification_data'
                            ,required: false
                            ,include: [{
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
                               model: PRPSubjects
                              ,attributes: ['uuid', 'name', 'inner_name']
                              ,as: 'subsubject_data'
                              ,required: false
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
                                 model: PRPPersons
                                ,attributes: ['uuid', 'first_name', 'middle_name', 'last_name', 'birth_date', 'age']
                                ,as: 'person_data'
                                ,required: false
                                ,include: [{
                                   model: PRPAccounts
                                  ,attributes: ['uuid', 'login']
                                  ,as: 'createAccount_data'
                                  ,required: false
                                }]
                             },

                            {
                                 model: PRPAccounts
                                ,attributes: ['uuid', 'login']
                                ,as: 'createAccount_data'
                                ,required: false
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
                            model: PRPSubjectSpecification
                            ,attributes: ['uuid', 'description']
                            ,as: 'from_subject_specification_data'
                            ,required: false
                            ,include: [{
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
                               model: PRPSubjects
                              ,attributes: ['uuid', 'name', 'inner_name']
                              ,as: 'subsubject_data'
                              ,required: false
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
                                 model: PRPPersons
                                ,attributes: ['uuid', 'first_name', 'middle_name', 'last_name', 'birth_date', 'age']
                                ,as: 'person_data'
                                ,required: false
                                ,include: [{
                                   model: PRPAccounts
                                  ,attributes: ['uuid', 'login']
                                  ,as: 'createAccount_data'
                                  ,required: false
                                }]
                             },

                            {
                                 model: PRPAccounts
                                ,attributes: ['uuid', 'login']
                                ,as: 'createAccount_data'
                                ,required: false
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
                            model: PRPSubjects
                            ,attributes: ['uuid', 'name', 'inner_name']
                            ,as: 'from_subject_data'
                            ,required: false
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
                            model: PRPSubjectSpecification
                            ,attributes: ['uuid', 'description']
                            ,as: 'to_subject_specification_data'
                            ,required: false
                            ,include: [{
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
                               model: PRPSubjects
                              ,attributes: ['uuid', 'name', 'inner_name']
                              ,as: 'subsubject_data'
                              ,required: false
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
                                 model: PRPPersons
                                ,attributes: ['uuid', 'first_name', 'middle_name', 'last_name', 'birth_date', 'age']
                                ,as: 'person_data'
                                ,required: false
                                ,include: [{
                                   model: PRPAccounts
                                  ,attributes: ['uuid', 'login']
                                  ,as: 'createAccount_data'
                                  ,required: false
                                }]
                             },

                            {
                                 model: PRPAccounts
                                ,attributes: ['uuid', 'login']
                                ,as: 'createAccount_data'
                                ,required: false
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
                            model: PRPSubjects
                            ,attributes: ['uuid', 'name', 'inner_name']
                            ,as: 'to_subject_data'
                            ,required: false
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
                             model: PRPCurrencies
                            ,attributes: ['uuid', 'name', 'code']
                            ,as: 'currency_data'
                            ,required: false
                          },

                          {     
                             model: PRPDocumentStates
                            ,attributes: ['uuid', 'name', 'operation']
                            ,as: 'documentState_data'
                            ,required: true
                          },
                          {
                            model: PRPAccounts
                           ,attributes: ['uuid', 'login']
                           ,as: 'createAccount_data'
                           ,required: false
                         },

                       ]

             }
   }
}

