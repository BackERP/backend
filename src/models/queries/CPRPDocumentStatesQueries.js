const PRPTypeDocuments = require('../db').PRPTypeDocuments;


export default class CPRPDocumentStatesQueries
{
   static items()
   {
      return {
               attributes: ['uuid', 'name', 'operation'],
                order: [
                         ['createdAt', 'DESC'],
                       ], 
                raw: true,
                nest: true,
                include: [
                          {
                            model: PRPTypeDocuments
                            ,attributes: ['uuid', 'name']
                            ,as: 'type_data'
                            ,required: true
                          },
                       ]
             }
   }
}

