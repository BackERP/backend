
const PRPBuyDocuments = require('../db').PRPBuyDocuments;
const PRPCurrencies = require('../db').PRPCurrencies;
const PRPBuyDocumentStates = require('../db').PRPBuyDocumentStates;




export default class CPRPBuyDocumentsQueries
{
   static items()
   {
      return {
               attributes: ['uuid', 'number', 'dateDoc', 'email', 'sum'],
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
                       model: PRPBuyDocumentStates
                      ,attributes: ['uuid', 'name']
                      ,as: 'documentState_data'
                      ,required: true
                     },
                ]
             }
   }
}

