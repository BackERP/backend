
import {MONGODB}  from '../../config/config';
import { MongoClient } from "mongodb";
import { map } from 'modern-async'


const getDBItem = async (collection, params)=>
{
       const query = { market: params.market, object_uuid: params.object_uuid};
       let representation = await collection.findOne(query);
       if(representation == null)
         representation = undefined;
       return representation;
}
const getDBList = async (collection, params)=>
{
/*
почему-то не работает, надо разбираться, но сейчас нет времени, поэтому хак
       const query = {$and:[{ market: params.market}, {object_uuid: {$in:params.list_uuid}}]};
       let representations = await collection.find(query);
        console.log(representations);
       if(representations == null)
         representations = undefined;
       return representations;
*/
   return await map(params.list_uuid, async (object_uuid)=>{
      return await getDBItem(collection, {market: params.market, object_uuid});
   });

}
const deleteDB = async (collection, params)=>
{
       const query = { market: params.market, object_uuid: params.object_uuid};
       let representations = await collection.deleteOne(query);
       if(representations == null)
         representations = undefined;
       return representations;

}


export default class CRPRMDBMarketRepresentations
{

    constructor(collection)
    {
      this.db = "purple";
      this.collection = collection;

    }
    async saveDB(collection, params)
    {

       let itemData = await getDBItem(collection, params);

//       const result = await marketschemas.deleteOne(query);

       const doc = {
          market: params.market,
          object_uuid: params.object_uuid,
       }
       for(let k in params.fields)
         doc[params.fields[k].name] = params.fields[k].value;

       const createdAt = (itemData !== undefined)?itemData.createdAt:new Date();
//       console.log('save', {createdAt, cmp: itemData != undefined, cmp2: itemData==null, type:typeof(itemData._id), itemData:itemData});
       doc.createdAt =  createdAt;
       doc.updatedAt =  new Date();
//       return itemData._id;
       if(itemData !== undefined)
         await deleteDB(collection, params);
       return await collection.insertOne(doc);

   }



    async requestDB(_call, params)
    {
      let result;
      let isOk = true;
      let error = '';
      const client = new MongoClient(MONGODB);
      try {

           const database = client.db(this.db);
           const collection = database.collection(this.collection);
           result = await _call(collection, params);
      }
      catch(e)
      {
        isOk = false;
        error = e.message;
        console.log(e);
      } finally {
        await client.close();
      }

     return {ok:isOk, error:error, data:result};
    }

    async trnDB(_call, params)
    {
      let result;
      let isOk = true;
      let error = '';
      const client = new MongoClient(MONGODB);
      const transactionOptions = {
         readConcern: { level: 'snapshot' },
         writeConcern: { w: 'majority' },
         readPreference: 'primary'
      };

      const session = client.startSession();

      try {
           session.startTransaction(transactionOptions);

           const database = client.db(this.db);
           const collection = database.collection(this.collection);
           result = await _call(collection, params);
           await session.commitTransaction();
      }
      catch(e)
      {
        isOk = false;
        error = e.message;
        await session.abortTransaction();
        console.log(e);

      } finally {
        await client.close();
      }

     return {ok:isOk, error:error, data:result};
    }

    async get(market, object_uuid)
    {
      return await this.requestDB(getDBItem, {market, object_uuid});
    }
    async list(market, list_uuid)
    {

      return await this.requestDB(getDBList, {market, list_uuid});
    }

    async save(market, object_uuid, fields)
    {
       return await this.trnDB(this.saveDB, {market, object_uuid, fields});
    }
}