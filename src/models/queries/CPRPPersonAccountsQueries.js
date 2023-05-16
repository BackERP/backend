
const PRPPersonAccounts = require('../db').PRPPersonAccounts;
const PRPAccounts = require('../db').PRPAccounts;
const PRPPersons = require('../db').PRPPersons;


export default class CPRPPersonAccountsQueries
{
   static items()
   {
      return {
               attributes: ['uuid'],
                order: [
                         ['createdAt', 'DESC'], 
                       ], 
                raw: true,
                nest: true,
                include: [{
                            model: PRPAccounts
                            ,attributes: ['uuid', 'login']
                            ,as: 'account_data'
                            ,required: true
                          },
                          {
                            model: PRPPersons
                            ,attributes: ['uuid', 'first_name', 'middle_name', 'last_name', 'birth_date', 'age']
                            ,as: 'person_data'
                            ,required: true
                            ,include: [{
                               model: PRPAccounts
                              ,attributes: ['uuid', 'login']
                              ,as: 'createAccount_data'
                              ,required: false
                            }]
                          },
                       ]
             }
   }
}

