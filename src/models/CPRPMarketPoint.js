import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';
import DefaultSetting from './config/DefaultSetting';
import CPRPDocuments from './CPRPDocuments';
import CPRPBookRecords from './CPRPBookRecords';
import CPRPAssetsResources from './CPRPAssetsResources';
import {TypeDocuments, DocumentsStates} from './enums/TypeDocuments';
import CPRPCommonHelper from '../helpers/CPRPCommonHelper';
import CRPRMDBSubject from './representations/CRPRMDBSubject';
import CRPRMDBPerson from './representations/CRPRMDBPerson';
import CRPRMDBAsset from './representations/CRPRMDBAsset';
import CPRPSubjectAttributes from './CPRPSubjectAttributes';



const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;
const shuffleArray = (array) => 
{
    const copyArray = array.map((obj)=>obj);
    for (let i = copyArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
    }
    return copyArray;
}



export default class CPRPMarketPoint extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async getBooksRecordsByDoc(offers)
    {
       const list_offers  =  offers.map((o)=>o.uuid);
       return await (new CPRPBookRecords).findByListDoc(list_offers);
       
    }
    async getBooksRecordsByControl(records)
    {
       const control_specs  =  records.reduce((t,r)=>{
         if(r.control_record_data !== undefined)
           t.push(r.control_record_data.uuid);
          return t; 
       }, []);
       return await (new CPRPBookRecords).findByRegSpec(control_specs);
       
    }

    nickLinkSubject(uuid)
    {
       if(uuid == '0ca4034f-b74a-4644-b3f0-193dbd712d69')
         return 'autismchallenge';
       if(uuid == '3e32ac13-742c-4860-9653-232e112bc883')
         return 'otkrytofond';
       if(uuid == 'a6b7b385-358f-4604-8d9a-97ab6a1c9399')
         return 'dobriymir';
    }

    async makeViewRecords(market, records)
    {
       const issueRecords = await this.getBooksRecordsByControl(records);

       const asset_resource_images  = await (new CPRPAssetsResources()).getAllDefaultData();
       const resource_images = asset_resource_images.map((r)=>{
         return {asset: r.asset_data.uuid,
                 image: CPRPCommonHelper.pathByProvider(r.provider_data.name, r.resource)
                }
       });
       const list_subjects  = [];
       const list_persons  = [];
       const list_assets  = [];
       for(let rec of records)
       {
          if(list_subjects.find((o)=>rec.asset_data.subject_data.uuid == o) == undefined)
            list_subjects.push(rec.asset_data.subject_data.uuid);
          if(list_persons.find((o)=>rec.asset_data.subject_specification_data.person_data.uuid == o) == undefined)
            list_persons.push(rec.asset_data.subject_specification_data.person_data.uuid);
          if(list_persons.find((o)=>rec.asset_data.uuid == o) == undefined)
            list_assets.push(rec.asset_data.uuid);
       }



       const viewsubjects = (await (new CRPRMDBSubject).list(market, list_subjects)).data;
       const viewpersons = (await (new CRPRMDBPerson).list(market, list_persons)).data;
       const viewassets = (await (new CRPRMDBAsset).list(market, list_assets)).data;


       const subjectattribures = await (new CPRPSubjectAttributes).findBySubjectsData(list_subjects);
       const findIndexAssetOffer = (arr, asset)=>
       {
          for(let i in arr)
            if(arr[i].asset == asset)
              return i;
           return -1;
       }
       const getFullName = (first_name, middle_name, last_name) =>
       {
         let full_name = '';
         if(first_name !== undefined && first_name !== null && first_name !== '')
           full_name = first_name;
         if(middle_name !== undefined && middle_name !== null && middle_name !== '')
           full_name = full_name + ((full_name == '')?middle_name:' ' + middle_name);
         if(last_name !== undefined && last_name !== null && last_name !== '')
           full_name = full_name + ((full_name == '')?last_name:' ' + last_name);

         return full_name;
       }

       const asset_on_offers =  records.reduce((t, r)=>{
          const asset = r.asset_data.uuid;                  
          const resource = r.asset_resource_data.resource;
          const resource_provider =r.asset_resource_data.provider_data.uuid;
          const isOriginal = (resource_provider == DefaultSetting.physicProvider);
          
          const issueRecord = issueRecords.find((o)=>o.reg_specification_data.uuid == r.control_record_data.uuid);
          const rest = (issueRecord !== undefined)?issueRecord.quantity:0;
          const issue = r.control_record_data.quantity;
          const price = r.price;
          const source = r.reg_specification_data.uuid;
          const progress = Math.round((100 * Number(rest)) / Number(issue));

          const index = findIndexAssetOffer(t, asset);

          if(index > -1)
          {

              if(isOriginal)
              {
                 t[index].original.price = price;
                 t[index].original.sold += Number(issue) - Number(rest);
                 t[index].original.issue += Number(issue);
                 t[index].original.rest += Number(rest);
                 t[index].original.resource = resource;
                 t[index].original.source = source;
                 t[index].original.progress = progress;
               }
               else
               {
                 t[index].token.price = price;
                 t[index].token.rest += Number(rest);
                 t[index].token.issue += Number(issue);
                 t[index].token.sold += Number(issue) - Number(rest);
                 t[index].token.resource = resource;
                 t[index].token.source = source;
                 t[index].token.progress = progress;
               }
               return t;
          }

          const image_data = resource_images.find((r)=>r.asset == asset);
          const image_link = (image_data !== undefined)?image_data.image:undefined;
          const viewperson = viewpersons.find((o)=>o.object_uuid == r.asset_data.subject_specification_data.person_data.uuid);
          viewperson.fullname = getFullName(viewperson.first_name, viewperson.middle_name, viewperson.last_name);
          const viewsubject = viewsubjects.find((o)=>o.object_uuid == r.asset_data.subject_data.uuid);
          viewsubject.page_link = this.nickLinkSubject(r.asset_data.subject_data.uuid);
          const subjectmedia = subjectattribures.reduce((t, s)=>{
                                                                if(s.subject_data.uuid != r.asset_data.subject_data.uuid)
                                                                  return t;

                                                                if(s.attribute_data.type_value == "media")
                                                                  t[s.attribute_data.name.replace(' ','_')] = CPRPCommonHelper.pathLocal(s.string_value);
                                                                return t;
                                                      }, []);

          //console.log('subjectmedia', subjectmedia);

          const data = {
             asset: asset,
             viewasset: viewassets.find((o)=>o.object_uuid == asset),
             suject: r.asset_data.subject_data.uuid,
             viewsubject: viewsubject,
             subjectmedia: subjectmedia,
             person: r.asset_data.subject_specification_data.person_data.uuid,
             viewperson: viewperson,
             offer: r.reg_document_data.uuid,
             image_link: image_link,
             token: {
                      price: (!isOriginal)?price:0,
                      rest: (!isOriginal)?Number(rest):0,
                      issue: (!isOriginal)?Number(issue):0,
                      sold: (!isOriginal)?(Number(issue) - Number(rest)):0,
                      resource: (!isOriginal)?resource:'',
                      source: (!isOriginal)?source:undefined,
                      progress: (!isOriginal)?progress:0,

                    },
             original: {
                         price: (isOriginal)?price:0,
                         rest: (isOriginal)?Number(rest):0,
                         issue: (isOriginal)?Number(issue):0,
                         sold: (isOriginal)?(Number(issue) - Number(rest)):0,
                         resource: (isOriginal)?resource:'',
                         source: (isOriginal)?source:undefined,
                         progress: (isOriginal)?progress:0,
                       },

          }
//          console.log(data);
          t.push(data);
          return t;
       }, []);

       return asset_on_offers;
    }
    makeSubjectsGallery(viewoffers)
    {
       const findSubject = (subjects, subject)=>{
          for(let i in subjects)
             if(subjects[i].uuid == subject)
                return i;
           return -1;
       }
       return viewoffers.reduce((t,r)=>{
         if(!r.viewsubject.showonmain)
           return t;
         let index = findSubject(t, r.suject);
         if(index == -1)
         {
           t.push({ uuid: r.suject,
                    order: r.viewsubject.order, 
                    view: r.viewsubject,
                    media: r.subjectmedia,
                    offers: [],
                    count_creations: 0,
                    count_tokens: 0,
                  });
             index = t.length - 1;
           }
           t[index].count_creations += 1;
           t[index].count_tokens += r.token.issue;
           t[index].offers.push(r);
           return t;

       }, []).sort((a, b) => parseInt(a.order) > parseInt(b.order)?1:-1);;
    }
    async main(marketplace)
    {


      try{

         const market = DefaultSetting.market(marketplace);
         const offers = await (new CPRPDocuments).findOnMarketData(market, TypeDocuments.offer);
         const records = await this.getBooksRecordsByDoc(offers);
         const viewoffers = await this.makeViewRecords(market, records);

         const gallery = shuffleArray(viewoffers).slice(0,8);
         const subjects_gallery = this.makeSubjectsGallery(viewoffers);

          return this.returnData({ gallery,
                                   subjects_gallery
                                 });
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    
  async creation(marketplace, offer){ 
      try{
           const market = DefaultSetting.market(marketplace);
           const offers = await (new CPRPDocuments).findOnMarketSameSubjectData(market, TypeDocuments.offer, offer);
           const records = await this.getBooksRecordsByDoc(offers);
           const viewoffers = await this.makeViewRecords(market, records);
           const viewoffer = viewoffers.find((o)=>o.offer == offer);
           const subjects_gallery = this.makeSubjectsGallery(viewoffers);
//      viewoffer

            return this.returnData({ offer: viewoffer,
                                     subjects_gallery
                                   });

        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
  }
  async organization(marketplace, subject){ 
      try{
           const market = DefaultSetting.market(marketplace);
           const offers = await (new CPRPDocuments).findOnMarketBySubjectData(market, TypeDocuments.offer, subject);
           const records = await this.getBooksRecordsByDoc(offers);
           const viewoffers = await this.makeViewRecords(market, records);
           const subjects_gallery = this.makeSubjectsGallery(viewoffers);

           return this.returnData({subjects_gallery});
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }

  }
}