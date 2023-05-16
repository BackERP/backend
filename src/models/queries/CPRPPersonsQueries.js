
const PRPPersons = require('../db').PRPPersons;
const PRPAccounts = require('../db').PRPAccounts;


export default class CPRPPersonsQueries
{
   static items()
   {
      return {
               attributes: ['uuid', 'first_name', 'middle_name', 'last_name', 'birth_date', 'age'],
                order: [
                         ['createdAt', 'DESC'], 
                       ], 
                raw: true,
                nest: true,
                include: [{
                               model: PRPAccounts
                              ,attributes: ['uuid', 'login']
                              ,as: 'createAccount_data'
                              ,required: false
                            }
                       ]
             }
   }
}

