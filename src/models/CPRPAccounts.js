const PRPAccounts = require('./db').PRPAccounts;
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';



const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const bcrypt = require("bcrypt")


export default class CPRPAccounts extends CPRPQuery
{
  async getAccount(uuid){
      try{
           const account = await PRPAccounts.findOne({ where: { uuid: uuid } });
           if(account === null)
              return {ok:false, error:'The account is not found', data:null};
           return {ok:true, error:'', data:account};
      }
      catch(err) {
            return {ok:false, error:err.message, data: null};
      }
  }

  async hashPassword(plaintextPassword) {
     const hash = await bcrypt.hash(plaintextPassword, 10);
     return hash;
    // Store hash in the database
  }

// compare password
  async comparePassword(plaintextPassword, hash) {
     const result = await bcrypt.compare(plaintextPassword, hash);
     return result;
  }
  async login(login, password)
  {
      const account = await PRPAccounts.findOne({ where: { login: login } });
      if(account == null)
        return {ok: false, error: 'The account is not exist'};

      if(this.comparePassword(password, account.password_hash))
         return {ok:true, data: {uuid: account.uuid, login: account.login}}


     return {ok: false, error: 'Bad login or password'};

  }

  async signup(login, password, confirm_password)
  {
     if(password !== confirm_password)
       return {ok: false, error: 'the confirm password is not equal of the password'}; 

      const account = await PRPAccounts.findOne({ where: { login: login } });
      if(account !== null)
        return {ok: false, error: 'The account is duplicated'};

      try{
            const hash = await this.hashPassword(password);

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const account_created = await PRPAccounts.create({ login: login, 
                                                                 password_hash: hash,
                                                                 createdAt: new Date(),
                                                                 updatedAt: new Date()
                                                              }, { transaction: t });

              return account_created;                                      
           });
           return {ok:true, data: {uuid: data.uuid, login: data.login}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }



     return {ok: false, error: 'Bad signup'};
  }

}

