const PRPCountries = require('../db').PRPCountries;
const PRPRegions = require('../db').PRPRegions;

export default class CPRPRegionsQueries
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
                               ,as: 'parent_data'
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
                               model: PRPCountries
                               ,attributes: ['uuid', 'name', 'alpha2', 'alpha3', 'numeric']
                               ,as: 'country_data'
                               ,required: false
                             },


                ]
             }
   }
}

