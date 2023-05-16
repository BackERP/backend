
const PRPSaleDocuments = require('../db').PRPSaleDocuments;
const PRPCurrencies = require('../db').PRPCurrencies;
const PRPSaleDocumentStates = require('../db').PRPSaleDocumentStates;
const PRPAccounts = require('../db').PRPAccounts;
const PRPSubjects = require('../db').PRPSubjects;
const PRPSubjectTypes = require('../db').PRPSubjectTypes;


export default class CPRPSaleDocumentsQueries
{
   static items()
   {
      return {
               attributes: ['uuid', 'number', 'dateDoc', 'sum'],
                order: [
                         ['createdAt', 'DESC'], 
                       ], 
                raw: true,
                nest: true,
                include: [
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
                     {
                       model: PRPAccounts
                      ,attributes: ['uuid', 'login']
                      ,as: 'createAccount_data'
                      ,required: false
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

