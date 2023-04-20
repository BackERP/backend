const PRPCountries = require('../db').PRPCountries;
const PRPRegions = require('../db').PRPRegions;
const PRPLanguages = require('../db').PRPLanguages;

export default class CPRPLocalesQueries
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
                             },
                             {
                               model: PRPLanguages
                               ,attributes: ['uuid', 'name', 'short']
                               ,as: 'language_data'
                               ,required: true
                             },


                ]
             }
   }
}

