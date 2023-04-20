const PRPDocuments = require('../db').PRPDocuments;
const PRPDocumentStates = require('../db').PRPDocumentStates;

const PRPAssets = require('../db').PRPAssets;
const PRPAssetsProviders = require('../db').PRPAssetsProviders;
const PRPAssetsMetaDataProviders = require('../db').PRPAssetsMetaDataProviders;
const PRPCurrencies = require('../db').PRPCurrencies;
const PRPAssetsResources = require('../db').PRPAssetsResources;
const PRPAssetsMetaDataResources = require('../db').PRPAssetsMetaDataResources;
const PRPAccounts = require('../db').PRPAccounts;
const PRPSubjectSpecification = require('../db').PRPSubjectSpecification;
const PRPTypeRelations = require('../db').PRPTypeRelations;
const PRPSubjects = require('../db').PRPSubjects;
const PRPPersons = require('../db').PRPPersons;
const PRPSubjectTypes = require('../db').PRPSubjectTypes;

const PRPBookRecords = require('../db').PRPBookRecords;
const PRPBooks = require('../db').PRPBooks;


const PRPDocumentSpecifications = require('../db').PRPDocumentSpecifications;





export default class CPRPDocumentSpecificationsQueries
{
   static items()
   {
      return {
               attributes: ['uuid', 'quantity', 'price', 'sum'],
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
                            ,include: [
                             {     
                               model: PRPCurrencies
                              ,attributes: ['uuid', 'name', 'code']
                              ,as: 'currency_data'
                              ,required: true
                             },
                             {     
                                model: PRPDocumentStates
                               ,attributes: ['uuid', 'name', 'operation']
                               ,as: 'documentState_data'
                               ,required: true
                             },
                           ]
                          },



                          {
                            model: PRPAssets
                           ,attributes: ['uuid', 'name', 'description', 'mime']
                           ,as: 'asset_data'
                           ,required: true
                           ,include: [{
                                model: PRPAccounts
                               ,attributes: ['uuid', 'login']
                               ,as: 'creater_data'
                               ,required: true
                              },
                              {
                                model: PRPSubjectSpecification
                               ,attributes: ['uuid', 'description']
                               ,as: 'subject_specification_data'
                               ,required: true
                               ,include: [{
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
                                          {
                                            model: PRPSubjects
                                           ,attributes: ['uuid', 'name']
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
                          },
                          {     
                             model: PRPAssetsResources
                            ,attributes: ['uuid', 'resource']
                            ,as: 'asset_resource_data'
                            ,required: false
                          },
                          {     
                             model: PRPAssetsMetaDataResources
                            ,attributes: ['uuid', 'resource']
                            ,as: 'asset_metadata_resource_data'
                            ,required: false
                          },
                          {     
                             model: PRPCurrencies
                            ,attributes: ['uuid', 'name', 'code']
                            ,as: 'currency_data'
                            ,required: true
                          },
                          {     
                             model: PRPBookRecords
                            ,attributes: ['uuid', 'reg_number', 'dateReg', 'price', 'quantity', 'sum']
                            ,as: 'source_record_data'
                            ,required: false
                            ,include: [{
                               model: PRPBooks
                              ,attributes: ['uuid', 'name']
                              ,as: 'book_data'
                              ,required: true
                             }
                            ]
                          },
                          {     
                             model: PRPDocumentSpecifications
                            ,attributes: ['uuid', 'quantity', 'price', 'sum']
                            ,as: 'control_record_data'
                            ,required: false
                          },

                         ]

             }
   }
}

