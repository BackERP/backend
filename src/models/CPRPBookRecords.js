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
    async findByRegSpecRecord(uuid)
    {
      return this.requestData(PRPBookRecords
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



    async get(uuid)
    {
      return this.request(PRPBookRecords
                         ,CPRPQueryLib.book_records.items()
                         ,{uuid: uuid}
                        );

    }
    async getData(uuid)
    {
      return this.requestData(PRPBookRecords
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
                                             next_record: obj.next_record,
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
                                           {where: {uuid: uuid}},
                                           { transaction: t });
    }

    async moveTrn(t, uuid, base_record, quantity)
    {
      const records = await this.getData(uuid);
      if(records.length == 0)
         throw new Error('Incorrect entry in the book');
      const record = resords[0];
      if(record.quantity < quantity)
         throw new Error('Quantity more than available');
      const quant = record.quantity - quantity;
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

    async moveBackTrn(t, uuid, base_record, quantity)
    {
      const records = await this.findByRegSpecRecord(uuid);
      if(records.length == 0)
         throw new Error('Incorrect entry in the book');
      const record = resords[0];
      const quant = record.quantity + quantity;
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
          const sources = await this.findByRegSpecRecord(obj.source_record);
          if(sources.length == 0)
            throw new Error('Unknown source record');
          obj.source_record = sources[0].uuid;
       }
       if(obj.master_record != undefined)
       {
          const masters = await this.findByRegSpecRecord(obj.master_record);
          if(masters.length == 0)
            throw new Error('Unknown issue record');
          obj.master_record = masters[0].uuid;
       }

       const record = await this.createTrn(t, account, obj);
       if(obj.source_record != undefined)
         await this.moveTrn(t, obj.source_record, record.uuid, obj.quantity);
       if(obj.master_record != undefined)
         await this.moveTrn(t, obj.master_record, record.uuid, obj.quantity);
       if(obj.move_to_record !== undefined)
         await this.moveBackTrn(t, obj.move_to_record, record.uuid, obj.quantity);


    }

    async createByItemSpecTrn(t, account, obj, isBreak)
    {
       if(!isBreak)
          return await this.moveItemSpecTrn(t, account, obj);
       const q = obj.quantity;
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
        const issue_spec = spec.reduce((t, spc)=>{
          if(spc.issue_record !== undefined)
             t.push(spc.issue_record);
           return t;
        }, []);
        const master_records = await this.findByRegSpec(issue_spec);
        const control_spec = spec.reduce((t, spc)=>{
          if(spc.control_record !== undefined)
             t.push(spc.control_record);
           return t;
        }, []);

        const control_records = await this.findByRegSpec(control_spec);



        return await map(spec, async (itm)=>{
           const master_record = master_records.find((r)=>r.reg_specification == itm.issue_record);
           const control_record = control_records.find((r)=>r.reg_specification == itm.control_record);
           let master_record_uuid;

           if(master_record !== undefined)
           {
             master_record_uuid = master_record.uuid;
             if(master_record.quantity < itm.quantity)
                throw new Error('Quantity more than available in issue');
             if(control_record !== undefined && control_record.quantity < itm.quantity)
                throw new Error('Quantity more than available in source document');

           }
 
           return await this.createByItemSpecTrn(t, account, { book: book,
                                                               reg_number: uuid(),
                                                               dateReg: new Date(),
                                                               subject: subject,
                                                               subject_specification: subject_specification,
                                                               asset: itm.asset,
                                                               asset_resource: itm.asset_resource,
                                                               asset_metadata_resource: itm.asset_metadata_resource,
                                                               price: itm.price,
                                                               quantity: itm.quantity,
                                                               sum: itm.price*itm.quantity,
                                                               currency: itm.currency,
                                                               reg_document: reg_document,
                                                               reg_specification: reg_specification,
                                                               source_record: obj.source_record,
                                                               issue_record: itm.issue_record,
                                                               master_record: master_record_uuid,
                                                               control_record: itm.control_record,
                                                               move_to_record: itm.move_to_record,
                  }, itm.isBreak !== undefined && itm.isBreak);


//           const record = await this.

        });
    }

    async moveRecords(account, book, sources, quantity)
    {
      try{
           const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
             let q = quantity;
             return await map(sources, async (record)=>{
                if(q == 0)
                  return;
                let qant = record.quantity;
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
                   return await this.moveTrn(t, record.uuid, new_record.uuid, quant);
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
             let q = quantity;
             return await map(sources, async (record)=>{
                if(q == 0)
                  return;
                let qant = record.quantity;
                if(qant > q)
                  qant = q;
                q -= qant;
                const new_record = await this.moveTrn(t, record.uuid, undefined, quant);
                return await this.moveBackTrn(t, record.source_record_data.uuid, new_record.uuid, qant);
             });

           });
           return {ok:true, data}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
 
    }


}