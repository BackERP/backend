
import {MONGODB}  from '../../config/config';
import { map } from 'modern-async'
import { MongoClient } from "mongodb";
import CRPRMDBMarketRepresentations from './CRPRMDBMarketRepresentations';
import CPRPPersons from '../CPRPPersons';
import CPRPPersonDetails from '../CPRPPersonDetails';
import CPRPMarkets from '../CPRPMarkets';
import CPRPCommonHelper from '../../helpers/CPRPCommonHelper';




export default class CRPRMDBPerson extends CRPRMDBMarketRepresentations
{
    constructor()
    {
      super('PersonMarket');
    }
    findAttribute(attributes, name)
    {
       const attribute = attributes.find((attr)=>attr.name == name);
       if(attribute == undefined)
         return;
       return attribute.description;
    }
    async fillPerson(market, person)
    {
      const result  = await (new CPRPPersonDetails).list(person.uuid, -1);
       if(!result.ok)
         return;
      const attributes = result.data;

      const language = market.locale_data.language_data.short.toLowerCase();

      const fields = [{ name: 'first_name',
                  value: await CPRPCommonHelper.translate(person.first_name, language)
                },
                { name: 'middle_name',
                  value: await CPRPCommonHelper.translate(person.middle_name, language)
                },
                { name: 'last_name',
                  value: await CPRPCommonHelper.translate(person.last_name, language)
                },
                { name:'age',
                  value: person.age
                },
                { name:'disorder',
                  value: await CPRPCommonHelper.translate(this.findAttribute(attributes, 'Расстройство'), language)
                },
      ]
      return await this.save(market.uuid, person.uuid, fields);
    }

    async fillByMarket(market)
    {
       const result = await (new CPRPPersons).list(-1);
       if(!result.ok)
         return;
       const persons = result.data;
       const data = await map(persons, async (person)=>{
         return {person: person.uuid, fields: await this.fillPerson(market, person)}
       });
       return {persons: data};

    }
    async fillFromAccounting()
    {

       const result = await (new CPRPMarkets).list(-1);
       if(!result.ok)
         return;

       const markets = result.data;
       const data = await map(markets, async (market)=>{
         return {market: market.uuid, subject: await this.fillByMarket(market)}
       });
       return {ok:true, error:'', data: {markets: data}};
    }

}