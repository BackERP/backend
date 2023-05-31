import {State} from './enums/State';
import {TypeContacts} from './enums/TypeContacts';
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
import CPRPDocumentContacts from './CPRPDocumentContacts';



const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;


export default class CPRPCertificates extends CPRPQuery
{
    constructor()
    {
      super();
    }

    async makeViewRecords(market, records)
    {

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

       const asset_on_certificate =  records.reduce((t, r)=>{
          const asset = r.asset_data.uuid;                  
          const resource = r.asset_resource_data.resource;
          const resource_provider =r.asset_resource_data.provider_data.uuid;

          const isOriginal = (resource_provider == DefaultSetting.physicProvider);
          const permanent_link = CPRPCommonHelper.pathByProvider(r.asset_resource_data.provider_data.name, resource);

          
          const rest = r.quantity;
          const quantity = r.reg_specification_data.quantity;
          const price = r.price;


          const image_data = resource_images.find((r)=>r.asset == asset);
          const image_link = (image_data !== undefined)?image_data.image:undefined;
          const viewperson = viewpersons.find((o)=>o.object_uuid == r.asset_data.subject_specification_data.person_data.uuid);
          viewperson.fullname = getFullName(viewperson.first_name, viewperson.middle_name, viewperson.last_name);
          const viewsubject = viewsubjects.find((o)=>o.object_uuid == r.asset_data.subject_data.uuid);
          const subjectmedia = subjectattribures.reduce((t, s)=>{
                                                                if(s.subject_data.uuid != r.asset_data.subject_data.uuid)
                                                                  return t;

                                                                if(s.attribute_data.type_value == "media")
                                                                {
                                                                   t.push({ name: s.attribute_data.name,                       
                                                                            link: CPRPCommonHelper.pathLocal(s.string_value)
                                                                   });
                                                                }
//                                                                  t[s.attribute_data.name.replace(' ','_')] = CPRPCommonHelper.pathLocal(s.string_value);

                                                                return t;
                                                      }, []);
          viewsubject.Lable = subjectmedia.find((a)=>a.name == 'Lable');



          const data = {
             certificate: r.reg_number,
             asset: asset,
             viewasset: viewassets.find((o)=>o.object_uuid == asset),
             suject: r.asset_data.subject_data.uuid,
             viewsubject: viewsubject,
             subjectmedia: subjectmedia,
             person: r.asset_data.subject_specification_data.person_data.uuid,
             viewperson: viewperson,
             offer: r.reg_document_data.uuid,
             image_link: image_link,
             isOriginal: isOriginal,
             permanent_link: permanent_link,
             price: price,
             rest: Number(rest),
             quantity: Number(quantity),
          }
          t.push(data);
          return t;
       }, []);
       return asset_on_certificate;
    }

    async paid(uuid, marketplace)
    {

      try{
        const market = DefaultSetting.market(marketplace);
        const documents = await (new CPRPDocuments).getData(uuid);
        if(documents.length == 0)
            throw new Error('The document is not found');
        const document = documents[0];
        const subject = document.to_subject_data.name;
        const contacts = await (new CPRPDocumentContacts).getByType(uuid, document.to_subject_data.uuid, TypeContacts.Email);
        let email;
        if(contacts.length > 0)
          email = contacts[0].contact;
        const phoneContacts = await (new CPRPDocumentContacts).getByType(uuid, document.to_subject_data.uuid, TypeContacts.Phone);
        let phone;
        if(phoneContacts.length > 0)
          phone = phoneContacts[0].contact;

        const records = await (new CPRPBookRecords).findByDoc(uuid);
        const certificates = await this.makeViewRecords(market, records);


        return this.returnData({ uuid,
                                 isOriginal:certificates[0].isOriginal,
                                 holder:{name: subject, email, phone},
                                 certificates,
                                 donation: {sum:document.sum, organization: certificates[0].viewsubject.name, title: certificates[0].viewasset.name, author: certificates[0].viewperson.fullname, permanent_link: certificates[0].permanent_link}
                                });
      }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }

    }
}