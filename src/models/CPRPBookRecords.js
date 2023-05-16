/*****************************************************************************/
/*
  Идея для развития
  Есть два вида записей
  1. Это желание (переместить, передать)
  2. Это реальное перемещение (оно может быть прямым и опосредованным)
  Любые операции - это комбинации этих типов действий
  Принял товар, хочу его продать
  Хочу купить, нужно под это найти товар
  Формально 
   Перемещение - желание      - желание - перемещение - перемещение
   (приход)     - (предложение)  (заказ) - (покупка)  - (возврат)
  Желание - желание - перемещение
  (заказ)   (заказ у поставщека) - (приход) - (передача)
это можно формализовать на урове правил отношения между ними - (уменьшаем желание, увеличиваем перемещение и т.д)
Тогда эти отношения можо убрать из кода, и формально описать. На этом уровне описать правила работы ведения конкретной книги

Еще мысль, это все можно распространить и на субъектов и их отношения (в качестве документа использвать договор (найма, сотрудничества и т.д.))
Тогда отошения между субъектами будут оределятся правилами ведения книги
Там тоже отношения желание - акт

А потом - это все можно вынести на уровень blockchain
книга - это контракт asset - ERC 20


*/
/*****************************************************************************/

const PRPBookRecords = require('./db').PRPBookRecords;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';
import CPRPTypeDocuments from './CPRPTypeDocuments';
import { map } from 'modern-async'
import { v4 as uuid } from 'uuid';




const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPBookRecords extends CPRPQuery
{
    constructor()
    {
      super();
    }

    async findAssetInBooks(books, asset)
    {
      return this.requestData(PRPBookRecords
                         ,CPRPQueryLib.book_records.items()
                         ,{ state: State.Active,
                             book: {
                                     [Op.in]: books//: {[Op.like]: '%A%'}
                                   },
                             asset: asset,
                             next_record: {
                               [Op.is]: null
                             },
                             quantity: {
                               [Op.gt]: 0
                             }
                          }
                        );
    }
    async findByRegSpec(spec)
    {
      return this.requestData(PRPBookRecords
                         ,CPRPQueryLib.book_records.items()
                         ,{ state: State.Active,
                             reg_specification: {
                                     [Op.in]: spec//: {[Op.like]: '%A%'}
                                   },
                             next_record: {
                               [Op.is]: null
                             },
                          }
                        );
    }
    async findByDoc(document)
    {
      return this.requestData(PRPBookRecords
                         ,CPRPQueryLib.book_records.items()
                         ,{ state: State.Active,
                             reg_document: document,
                             next_record: {
                               [Op.is]: null
                             },
                          }
                        );
    }
    async findByListDoc(documents)
    {
      return this.requestData(PRPBookRecords
                         ,CPRPQueryLib.book_records.items()
                         ,{ state: State.Active,
                             reg_document: {

                                  [Op.in]: documents
                             },
                             next_record: {
                               [Op.is]: null
                             },
                          }
                        );
    }

    async findByRegSpecRecord(uuid, t)
    {
      return this.requestDataTrn(t, PRPBookRecords
                         ,CPRPQueryLib.book_records.items()
                         ,{ state: State.Active,
                             reg_specification: {
                                     [Op.in]: Sequelize.literal("(select reg_specification from PRPBookRecords where uuid='"+ uuid + "')")//: {[Op.like]: '%A%'}
                                   },
                             next_record: {
                               [Op.is]: null
                             },
                          }
                        );
    }
    async findUUIDSByRegSpecRecord(uuid, t)
    {
      return this.requestDataTrn(t, PRPBookRecords
                         ,CPRPQueryLib.book_records.uuid_items()
                         ,{ state: State.Active,
                             reg_specification: {
                                     [Op.in]: Sequelize.literal("(select reg_specification from PRPBookRecords where uuid='"+ uuid + "')")//: {[Op.like]: '%A%'}
                                   },
                             next_record: {
                               [Op.is]: null
                             },
                          }
                        );
    }

    async findAllUUIDSByRegSpecRecord(uuid, t)
    {
      return this.requestDataTrn(t,PRPBookRecords
                         ,CPRPQueryLib.book_records.uuid_items()
                         ,{ state: State.Active,
                             reg_specification: {
                                     [Op.in]: Sequelize.literal("(select reg_specification from PRPBookRecords where uuid='"+ uuid + "')")//: {[Op.like]: '%A%'}
                                   },
                          }
                        );
    }






    async get(uuid)
    {
      return this.request(PRPBookRecords
                         ,CPRPQueryLib.book_records.items()
                         ,{uuid: uuid}
                        );

    }
    async getData(uuid, t)
    {
      return this.requestDataTrn(t, PRPBookRecords
                         ,CPRPQueryLib.book_records.items()
                         ,{uuid: uuid}
                        );

    }

    async list(page, countItems)
    {
      return this.pagination(PRPBookRecords
                         ,CPRPQueryLib.book_records.items()
                         , {state: State.Active}
                         , countItems
                         , page
                        );
    }

    async createTrn(t, account, obj)
    {
       return await PRPBookRecords.create({  book: obj.book,
                                             reg_number: obj.reg_number,
                                             dateReg: obj.dateReg,
                                             subject: obj.subject,
                                             subject_specification: obj.subject_specification,
                                             pre_record: obj.pre_record,
//                                             next_record: obj.next_record,
                                             asset: obj.asset,
                                             asset_resource: obj.asset_resource,
                                             asset_metadata_resource: obj.asset_metadata_resource,
                                             price: obj.price,
                                             quantity: obj.quantity,
                                             sum: obj.sum,
                                             currency: obj.currency,
                                             reg_document: obj.reg_document,
                                             reg_specification: obj.reg_specification,
                                             base_record: obj.base_record,
                                             source_record: obj.source_record,
                                             issue_record: obj.issue_record,
                                             master_record: obj.master_record,
                                             control_record: obj.control_record,
                                             createdAt: new Date(),
                                             updatedAt: new Date()
                                           }, { transaction: t });
    }
    getUUID(obj)
    {
       if(obj === undefined)
         return;
       return obj.uuid;
    }
    async updateNextTrn(t, uuid, next_record)
    {
       return await PRPBookRecords.update({ next_record: next_record,
                                            updatedAt: new Date()
                                           }, 
                                           {where: {uuid: uuid},
                                           transaction: t });
    }

    async moveTrn(t, account, uuid, base_record, quantity)
    {
      const records = await this.getData(uuid, t);
      if(records.length == 0)
         throw new Error('Incorrect entry in the book');
      const record = records[0];
      if(Number(record.quantity) < Number(quantity))
         throw new Error('Quantity more than available');
      const quant = Number(record.quantity) - Number(quantity);
      const new_record = await this.createTrn(t, account, { book: this.getUUID(record.book_data),
                                                            reg_number: record.reg_number,
                                                            dateReg: record.dateReg,
                                                            subject: this.getUUID(record.subject_data),
                                                            subject_specification: this.getUUID(record.subject_specification_data),
                                                            pre_record: uuid,
                                                            next_record: undefined,
                                                            asset: this.getUUID(record.asset_data),
                                                            asset_resource: this.getUUID(record.asset_resource_data),
                                                            asset_metadata_resource: this.getUUID(record.asset_metadata_resource_data),
                                                            price: record.price,
                                                            quantity: quant,
                                                            sum: record.price*quant,
                                                            currency: this.getUUID(record.currency_data),
                                                            reg_document: this.getUUID(record.reg_document_data),
                                                            reg_specification: this.getUUID(record.reg_specification_data),
                                                            base_record: base_record,
                                                            source_record: this.getUUID(record.source_record_data),
                                                            issue_record: this.getUUID(record.issue_record_data),
                                                            master_record: this.getUUID(record.master_record_data),
                                                            control_record: this.getUUID(record.control_record_data),
                        });
      await this.updateNextTrn(t, record.uuid, new_record.uuid);
     
      return new_record;


    }

    async moveBackTrn(t, account, uuid, base_record, quantity)
    {
      const records = await this.findByRegSpecRecord(uuid, t);
      if(records.length == 0)
         throw new Error('Incorrect entry in the book');
      const record = resords[0];
      const quant = Number(record.quantity) + Number(quantity);
      const new_record = await this.createTrn(t, account, { book: this.getUUID(record.book_data),
                                                            reg_number: record.reg_number,
                                                            dateReg: record.dateReg,
                                                            subject: this.getUUID(record.subject_data),
                                                            subject_specification: this.getUUID(record.subject_specification_data),
                                                            pre_record: uuid,
                                                            next_record: undefined,
                                                            asset: this.getUUID(record.asset_data),
                                                            asset_resource: this.getUUID(record.asset_resource_data),
                                                            asset_metadata_resource: this.getUUID(record.asset_metadata_resource_data),
                                                            price: record.price,
                                                            quantity: quant,
                                                            sum: record.price*quant,
                                                            currency: this.getUUID(record.currency_data),
                                                            reg_document: this.getUUID(record.reg_document_data),
                                                            reg_specification: this.getUUID(record.reg_specification_data),
                                                            base_record: base_record,
                                                            source_record: this.getUUID(record.source_record_data),
                                                            issue_record: this.getUUID(record.issue_record_data),
                                                            master_record: this.getUUID(record.master_record_data),
                                                            control_record: this.getUUID(record.control_record_data),
                        });
      return await this.updateNextTrn(t, record.uuid, new_record.uuid);


    }


    async moveItemSpecTrn(t, account, obj)
    {
       if(obj.source_record != undefined)
       {
          const sources = await this.findUUIDSByRegSpecRecord(obj.source_record, t);
          if(sources.length == 0)
            throw new Error('Unknown source record');
          obj.source_record = sources[0].uuid;
       }
       if(obj.master_record != undefined)
       {
          const masters = await this.findUUIDSByRegSpecRecord(obj.master_record, t);
          if(masters.length == 0)
            throw new Error('Unknown issue record');
          obj.master_record = masters[0].uuid;
       }

       const record = await this.createTrn(t, account, obj);
       if(obj.source_record != undefined)
         await this.moveTrn(t, account, obj.source_record, record.uuid, obj.quantity);
       if(obj.master_record != undefined)
         await this.moveTrn(t, account, obj.master_record, record.uuid, obj.quantity);
       if(obj.move_to_record !== undefined)
         await this.moveBackTrn(t, account, obj.move_to_record, record.uuid, obj.quantity);


    }

    async createByItemSpecTrn(t, account, obj, isBreak)
    {
       if(!isBreak)
          return await this.moveItemSpecTrn(t, account, obj);
       const q = Number(obj.quantity);
       for(let i = 0; i < q; i++)
       {
         obj.sum = obj.price;
         obj.quantity = 1;
         obj.reg_number = uuid();
         await this.moveItemSpecTrn(t, account, obj);
       }

    }

    async createBySpecTrn(t, type, reg_document, subject, subject_specification, reg_specification, spec, account)
    {
        const typeDocuments = await (new CPRPTypeDocuments).getData(type);

        if(typeDocuments.length == 0)
          throw new Error('Unknown document type');
        const typeDocument = typeDocuments[0];

        const book = typeDocument.book_data.uuid;

        let master_records = [];
        if(spec.issue_record !== undefined)
           master_records = await this.findByRegSpec([spec.issue_record]);



       let control_records = [];
       if(spec.control_record !== undefined)
          control_records = await this.findByRegSpec([spec.control_record]);



           const master_record = master_records.find((r)=>r.reg_specification_data.uuid == spec.issue_record);
           const control_record = control_records.find((r)=>r.reg_specification_data.uuid == spec.control_record);
           let master_record_uuid;

           if(master_record !== undefined)
           {
             if(spec.isMove !== undefined && spec.isMove)
                master_record_uuid = master_record.uuid;

             if(Number(master_record.quantity) < Number(spec.quantity))
                throw new Error('Quantity more than available in issue');
             //Ордер пытается поверить количество на оффере, а оно там 1, всегда и не двигается, нужно как-то это абстрактно обработать
             if(spec.isMove !== undefined && spec.isMove)
               if(control_record !== undefined && Number(control_record.quantity) < Number(spec.quantity))
                  throw new Error('Quantity more than available in source document');

           }

 
           return await this.createByItemSpecTrn(t, account, { book: book,
                                                               reg_number: uuid(),
                                                               dateReg: new Date(),
                                                               subject: subject,
                                                               subject_specification: subject_specification,
                                                               asset: spec.asset,
                                                               asset_resource: spec.asset_resource,
                                                               asset_metadata_resource: spec.asset_metadata_resource,
                                                               price: spec.price,
                                                               quantity: spec.quantity,
                                                               sum: spec.price*spec.quantity,
                                                               currency: spec.currency,
                                                               reg_document: reg_document,
                                                               reg_specification: reg_specification,
                                                               source_record: spec.source_record,
                                                               issue_record: spec.issue_record,
                                                               master_record: master_record_uuid,
                                                               control_record: spec.control_record,
                                                               move_to_record: spec.move_to_record,
                  }, spec.isBreak !== undefined && spec.isBreak);


//           const record = await this.

    }

    async moveRecords(account, book, sources, quantity)
    {
      try{
           const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
             let q = Number(quantity);
             return await map(sources, async (record)=>{
                if(q == 0)
                  return;
                let qant = Number(record.quantity);
                if(qant > q)
                  qant = q;
                q -= qant;

                const new_record = await this.createTrn(t, account, { book: book,
                                                                      reg_number: uuid(),
                                                                      dateReg: record.dateReg,
                                                                      subject: this.getUUID(record.subject_data),
                                                                      subject_specification: this.getUUID(record.subject_specification_data),
                                                                      asset: this.getUUID(record.asset_data),
                                                                      asset_resource: this.getUUID(record.asset_resource_data),
                                                                      asset_metadata_resource: this.getUUID(record.asset_metadata_resource_data),
                                                                      price: record.price,
                                                                      quantity: qant,
                                                                      sum: record.price*qant,
                                                                      currency: this.getUUID(record.currency_data),
                                                                      source_record: record.uuid,
                           });
                   return await this.moveTrn(t, account, record.uuid, new_record.uuid, quant);
             });
           });
           return {ok:true, data}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }

    async backRecords(account, sources, quantity)
    {
      try{
           const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
             let q = Number(quantity);
             return await map(sources, async (record)=>{
                if(q == 0)
                  return;
                let qant = Number(record.quantity);
                if(qant > q)
                  qant = q;
                q -= qant;
                const new_record = await this.moveTrn(t, account, record.uuid, undefined, quant);
                return await this.moveBackTrn(t, account, record.source_record_data.uuid, new_record.uuid, qant);
             });

           });
           return {ok:true, data}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
 
    }


}