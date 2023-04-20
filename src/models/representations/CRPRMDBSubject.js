
import {MONGODB}  from '../../config/config';
import { map } from 'modern-async'

import { MongoClient } from "mongodb";
import CRPRMDBMarketRepresentations from './CRPRMDBMarketRepresentations';
import CPRPSubjects from '../CPRPSubjects';
import CPRPSubjectAttributes from '../CPRPSubjectAttributes';
import CPRPMarkets from '../CPRPMarkets';
import CPRPCommonHelper from '../../helpers/CPRPCommonHelper';



export default class CRPRMDBSubject extends CRPRMDBMarketRepresentations
{
    constructor()
    {
      super('SubjectEntityMarket');
    }

    findAttribute(attributes, name)
    {
       const attribute = attributes.find((attr)=>attr.attribute_data.name == name);
       if(attribute == undefined)
         return;
       return (attribute.attribute_data.type_value == 'text')?attribute.text_value:attribute.string_value;
    }
    //Начальное заполнение данных
    async fillSubject(market, subject)
    {
       const result = await (new CPRPSubjectAttributes).list(subject.uuid, -1);
       if(!result.ok)
         return;
       const attributes = result.data;

       const language = market.locale_data.language_data.short.toLowerCase();
//       return {language, text:await CPRPCommonHelper.translate(subject.name, language)};

       const fields = [{ name: 'name',
                         value: await CPRPCommonHelper.translate(subject.name, language)
                       },
                       { name: 'showonmain',
                         value: subject.show_main
                       },
                       { name: 'order',
                         value: subject.order
                       },
                       { name:'description',
                         value: await CPRPCommonHelper.translate(this.findAttribute(attributes, 'Description'), language)
                       },
                       { name:'short_description',
                         value: await CPRPCommonHelper.translate(this.findAttribute(attributes, 'Short'), language)
                       },                   
                       { name:'site',
                         value: this.findAttribute(attributes, 'Site')
                       },
                       { name:'city',
                         value: await CPRPCommonHelper.translate(this.findAttribute(attributes, 'City'), language)
                       }
      ]
//      return fields;
      return await this.save(market.uuid, subject.uuid, fields);
    }

    async fillByMarket(market)
    {
       const result = await (new CPRPSubjects).list(-1);
       if(!result.ok)
         return;
       const subjects = result.data;
       const data = await map(subjects, async (subject)=>{
         const fields = await this.fillSubject(market, subject);
         return {subject: subject.uuid, fields: fields};
       });
       return {subjects: data};

    }
    async fillFromAccounting()
    {

       const result = await (new CPRPMarkets).list(-1);
       if(!result.ok)
         return;

       const markets = result.data;

       const data = await map(markets, async (market)=>{
         const subjects = await this.fillByMarket(market);
         return {market: market.uuid, subjects: subjects};
       });
       return {ok:true, error:'', data: {markets: data}};
    }
}