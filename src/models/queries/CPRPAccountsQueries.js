
const PRPAccounts = require('../db').PRPAccounts;


export default class CPRPAccountsQueries
{
   static items()
   {
      return {
               attributes: ['uuid', 'login'],
                order: [
                         ['createdAt', 'DESC'],
                       ], 
                raw: true,
                nest: true,
             }
   }
}

