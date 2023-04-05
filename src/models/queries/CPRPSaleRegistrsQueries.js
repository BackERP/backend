
const PRPSaleRegistrs = require('../db').PRPSaleRegistrs;
const PRPAssets = require('../db').PRPAssets;
const PRPAssetsProviders = require('../db').PRPAssetsProviders;
const PRPAssetsMetaDataProviders = require('../db').PRPAssetsMetaDataProviders;
const PRPCurrencies = require('../db').PRPCurrencies;
const PRPBuyDocuments = require('../db').PRPBuyDocuments;
const PRPBuyDocumentSpecifications = require('../db').PRPBuyDocumentSpecifications;
const PRPSaleDocuments = require('../db').PRPSaleDocuments;
const PRPSaleDocumentSpecifications = require('../db').PRPSaleDocumentSpecifications;
const PRPAssetsResources = require('../db').PRPAssetsResources;
const PRPAssetsMetaDataResources = require('../db').PRPAssetsMetaDataResources;
const PRPAccounts = require('../db').PRPAccounts;
const PRPSubjectSpecification = require('../db').PRPSubjectSpecification;
const PRPTypeRelations = require('../db').PRPTypeRelations;
const PRPSubjects = require('../db').PRPSubjects;
const PRPPersons = require('../db').PRPPersons;
const PRPBuyDocumentStates = require('../db').PRPBuyDocumentStates;
const PRPSaleDocumentStates = require('../db').PRPSaleDocumentStates;
const PRPSubjectTypes = require('../db').PRPSubjectTypes;






export default class CPRPSaleRegistrsQueries
{
   static items(orderItems)
   {
      const orderBy = [];
      if(orderItems === undefined)
        orderBy.push(['createdAt', 'DESC']);
       else
        orderBy.push(orderItems);
      return {
               attributes: ['uuid', 'reg_number', 'dateReg', 'price', 'quantity', 'sum'],
                order: orderBy, 
                raw: true,
                nest: true,
                include: [{
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
                     model: PRPAssetsProviders
                    ,attributes: ['uuid', 'name']
                    ,as: 'assetProvider_data'
                    ,required: true
                  },
                  {     
                     model: PRPAssetsMetaDataProviders
                    ,attributes: ['uuid', 'name']
                    ,as: 'assetMetaDataProvider_data'
                    ,required: false
                  },
                  {     
                     model: PRPCurrencies
                    ,attributes: ['uuid', 'name', 'code']
                    ,as: 'currency_data'
                    ,required: true
                  },
                  {     
                     model: PRPSaleRegistrs
                    ,attributes: ['uuid', 'reg_number', 'dateReg', 'quantity', 'price', 'sum']
                    ,as: 'pev_registr_data'
                    ,required: false
                    ,include:[
                     {     
                        model: PRPCurrencies
                       ,attributes: ['uuid', 'name', 'code']
                       ,as: 'currency_data'
                       ,required: true
                     },
                    ]
                  },

                  {     
                     model: PRPSaleRegistrs
                    ,attributes: ['uuid', 'reg_number', 'dateReg', 'quantity', 'price', 'sum']
                    ,as: 'next_registr_data'
                    ,required: false
                    ,include:[
                     {     
                        model: PRPCurrencies
                       ,attributes: ['uuid', 'name', 'code']
                       ,as: 'currency_data'
                       ,required: true
                     },
                    ]
                  },

                  {     
                     model: PRPSaleDocuments
                    ,attributes: ['uuid', 'number', 'dateDoc', 'sum']
                    ,as: 'reg_document_data'
                    ,required: true
                    ,include:[
                       {     
                         model: PRPCurrencies
                        ,attributes: ['uuid', 'name', 'code']
                        ,as: 'currency_data'
                        ,required: true
                       },
                       {     
                         model: PRPSaleDocumentStates
                        ,attributes: ['uuid', 'name']
                        ,as: 'documentState_data'
                        ,required: true
                       },

                    ]
                  },
                  {     
                     model: PRPSaleDocumentSpecifications
                    ,attributes: ['uuid', 'quantity', 'price', 'sum']
                    ,as: 'reg_specification_data'
                    ,required: true
                  },

                  {     
                     model: PRPBuyDocuments
                    ,attributes: ['uuid', 'number', 'dateDoc', 'email', 'sum']
                    ,as: 'base_document_data'
                    ,required: false
                    ,include:[
                       {     
                         model: PRPCurrencies
                        ,attributes: ['uuid', 'name', 'code']
                        ,as: 'currency_data'
                        ,required: true
                       },
                       {     
                         model: PRPBuyDocumentStates
                        ,attributes: ['uuid', 'name']
                        ,as: 'documentState_data'
                        ,required: true
                       },

                    ]
                  },
                  {     
                     model: PRPBuyDocumentSpecifications
                    ,attributes: ['uuid', 'quantity', 'price', 'sum']
                    ,as: 'base_specification_data'
                    ,required: false
                    ,include:[
                       {     
                         model: PRPSaleRegistrs
                        ,attributes: ['uuid', 'reg_number', 'dateReg', 'quantity', 'price', 'sum']
                        ,as: 'source_registr_data'
                        ,required: true
                        ,include:[
                           {     
                             model: PRPCurrencies
                            ,attributes: ['uuid', 'name', 'code']
                            ,as: 'currency_data'
                            ,required: true
                           },
                        ]
                       },

                    ]
                  },

                  {     
                     model: PRPAssetsResources
                    ,attributes: ['uuid', 'resource']
                    ,as: 'resource_data'
                    ,required: true
                    ,include:[
                       {
                         model: PRPAssetsProviders
                        ,attributes: ['uuid', 'name', 'default_item']
                        ,as: 'provider_data'
                        ,required: true
                       },

                    ]
                  },
                  {     
                     model: PRPAssetsMetaDataResources
                    ,attributes: ['uuid', 'resource']
                    ,as: 'metadataresource_data'
                    ,required: false
                  },
                  {
                     model: PRPAccounts
                    ,attributes: ['uuid', 'login']
                    ,as: 'createAccount_data'
                    ,required: false
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
             }
   }
}

