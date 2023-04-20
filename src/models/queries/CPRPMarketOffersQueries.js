const PRPMarkets = require('../db').PRPMarkets;
const PRPDocuments = require('../db').PRPDocuments;
const PRPCurrencies = require('../db').PRPCurrencies;
const PRPLocales = require('../db').PRPLocales;
const PRPCountries = require('../db').PRPCountries;
const PRPRegions = require('../db').PRPRegions;
const PRPLanguages = require('../db').PRPLanguages;



export default class CPRPMarketOffersQueries
{
   static items()
   {
      return {
               attributes: ['uuid', 'order', 'stateMarket'],
                order: [
                         ['createdAt', 'DESC'],
                       ], 
                raw: true,
                nest: true,
                include: [
                          {
                            model: PRPMarkets
                            ,attributes: ['uuid', 'name', 'activeMarket']
                            ,as: 'market_data'
                            ,required: true
                            ,include: [
                             {     
                                model: PRPCurrencies
                               ,attributes: ['uuid', 'name', 'code']
                               ,as: 'currency_data'
                               ,required: true
                             },
                             {     
                                model: PRPLocales
                               ,attributes: ['uuid', 'name']
                               ,as: 'locale_data'
                               ,required: true
                               ,include: [
                                {
                                   model: PRPLanguages
                                  ,attributes: ['uuid', 'name', 'short']
                                  ,as: 'language_data'
                                  ,required: true
                                 },
                                 {
                                   model: PRPRegions
                                  ,attributes: ['uuid', 'name']
                                  ,as: 'region_data'
                                  ,required: false
                                  , include: [
                                    {
                                     model: PRPCountries
                                    ,attributes: ['uuid', 'name', 'alpha2', 'alpha3', 'numeric']
                                    ,as: 'country_data'
                                    ,required: false
                                    }
                                   ]
                                 }
                                ]
                              },


                            ]
                          },
                          {     
                            model: PRPDocuments
                            ,attributes: ['uuid', 'number', 'dateDoc', 'sum', 'external_number']
                            ,as: 'source_offer_data'
                            ,required: false
                          },
                          {     
                            model: PRPDocuments
                            ,attributes: ['uuid', 'number', 'dateDoc', 'sum', 'external_number']
                            ,as: 'offer_data'
                            ,required: true
                          },

                       ]
             }
   }
}

