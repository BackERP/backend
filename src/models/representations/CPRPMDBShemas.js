
import {MONGODB}  from '../../config/config';
import { MongoClient } from "mongodb";

export default class CPRPMDBShemas
{
   async get(name)
   {
     let schema;
     const client = new MongoClient(MONGODB);
     try {

           const database = client.db("purple");
//       console.log(database);
           const marketschemas = database.collection("marketschemas");
           const query = { shema: name };
           schema = await marketschemas.findOne(query);
           if(schema == null)
             schema = undefined;
     }
     catch(e)
     {
        console.log(e);
     } finally {
       await client.close();
     }

     return {ok:true, error:'', data:schema};
   }
   async list()
   {

  //   return client;
     return {method:MONGODB};
   }
   async seedSubject(marketschemas)
   {

       const query = { shema: "Subject Entity" };
       const result = await marketschemas.deleteOne(query);

       const doc = {
         shema: "Subject Entity",
         fields: [{ name:'Name',
                    type: 'string',
                    required:true,
                    variable:'name',
                    order: 1
                  },
                  { name:'Show on main page',
                    type: 'boolean',
                    required:true,
                    variable:'showonmain',
                    order: 2
                  },
                  { name:'Order',
                    type: 'integer',
                    required:true,
                    variable:'order',
                    order: 3
                  },
/*
                  { name:'Label',
                    type: 'reference',
                    object: 'PRPSubjectAttributes',
                    view: 'image',
                    required:false,
                    variable:'label',
                    order: 4
                  },
                  { name:'Second label',
                    type: 'reference',
                    object: 'PRPSubjectAttributes',
                    view: 'image',
                    required:false,
                    variable:'second_label',
                    order: 5
                  },
*/
                  { name:'Description',
                    type: 'html',
                    required:true,
                    variable:'description',
                    order: 6
                  },
                  { name:'Short description',
                    type: 'text',
                    required:true,
                    variable:'short_description',
                    order: 7
                  },
                  { name:'Site',
                    type: 'string',
                    view: 'Link',
                    required:false,
                    variable:'site',
                    order: 8
                  },
                  { name:'City',
                    type: 'string',
                    required:false,
                    variable:'city',
                    order: 9
                  },
         ],
         createdAt: new Date(),
         updatedAt: new Date()
       }
       return await marketschemas.insertOne(doc);
   }

   async seedPerson(marketschemas)
   {

       const query = { shema: "Person" };
       const result = await marketschemas.deleteOne(query);

       const doc = {
         shema: "Person",
         fields: [{ name:'First name',
                    type: 'string',
                    required:true,
                    variable:'first_name',
                    order: 1
                  },
                  { name:'Middle name',
                    type: 'string',
                    required:false,
                    variable:'middle_name',
                    order: 2
                  },
                  { name:'Last name',
                    type: 'string',
                    required:false,
                    variable:'last_name',
                    order: 3
                  },
                  { name:'Age',
                    type: 'integer',
                    required:false,
                    variable:'age',
                    order: 4
                  },
                  { name:'Disorder',
                    type: 'string',
                    required:false,
                    variable:'disorder',
                    order: 4
                  },


         ],
         createdAt: new Date(),
         updatedAt: new Date()
       }
       return await marketschemas.insertOne(doc);
   }
   async seedAsset(marketschemas)
   {

       const query = { shema: "Asset" };
       const result = await marketschemas.deleteOne(query);

       const doc = {
         shema: "Asset",
         fields: [{ name:'Name',
                    type: 'string',
                    required:true,
                    variable:'name',
                    order: 1
                  },
                  { name:'Description',
                    type: 'html',
                    required:false,
                    variable:'description',
                    order: 2
                  },
/*
                  { name:'Resource',
                    type: 'reference',
                    object: 'PRPAssetsResources',
                    view: 'image',
                    required:false,
                    variable:'resource',
                    order: 3
                  },
                  { name:'View',
                    type: 'reference',
                    object: 'PRPAssetsResources',
                    view: 'image',
                    required:false,
                    variable:'view',
                    order: 4
                  },
*/
         ],
         createdAt: new Date(),
         updatedAt: new Date()
       }
       return await marketschemas.insertOne(doc);
   }

   async seed()
   {
     const client = new MongoClient(MONGODB);
     try {

       const database = client.db("purple");
//       console.log(database);
       const marketschemas = database.collection("marketschemas");
    // create a document to insert
       await this.seedSubject(marketschemas);
       await this.seedPerson(marketschemas);
       await this.seedAsset(marketschemas);

//       console.log(`A document was inserted with the _id: ${result.insertedId}`);
     }
     catch(e)
     {
       console.log(e);
    } finally {
      await client.close();
    }

     return {method:'seed'};
   }


}