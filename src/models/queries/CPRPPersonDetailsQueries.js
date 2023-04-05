
const PRPPersonDetails = require('../db').PRPPersonDetails;
const PRPAccounts = require('../db').PRPAccounts;
const PRPPersons = require('../db').PRPPersons;


export default class CPRPPersonDetailsQueries
{
   static items()
   {
      return {
               attributes: ['uuid', 'name', 'photo', 'description', 'order'],
                order: [
                         ['order', 'ASC'], 
                         ['createdAt', 'DESC'], 
                       ], 
                raw: true,
                nest: true,
                include: [{
                            model: PRPPersons
                            ,attributes: ['uuid', 'first_name', 'middle_name', 'last_name', 'birth_date', 'age']
                            ,as: 'person_data'
                            ,required: true
                            ,include: [{
                               model: PRPAccounts
                              ,attributes: ['uuid', 'login']
                              ,as: 'createAccount_data'
                              ,required: true
                            }]
                          },
                       ]
             }
   }
}

