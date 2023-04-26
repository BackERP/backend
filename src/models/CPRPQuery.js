const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;

export default class CPRPQuery
{

  killAttributes(includes)
  {
     if(includes === undefined)
       return includes;
     const newIncludes = JSON.parse(JSON.stringify(includes));
     for(let inc of newIncludes)
     {
        if(inc.attributes !== undefined)
          inc.attributes = undefined;
        if(inc.include !== undefined)
          inc.include = this.killAttributes(include);
     }
     return newIncludes;
  }
  makeCountQuery(query)
  {
    const newQuery = JSON.parse(JSON.stringify(query));
    newQuery.attributes = [[sequelize.fn('COUNT', '*'), 'cnt']];
    newQuery.limit = undefined;
    newQuery.offset = undefined;
    newQuery.include = this.killAttributes(newQuery.include);
    return newQuery;
  }
  getPageQuery(query, limit, offset)
  {
    const newQuery = JSON.parse(JSON.stringify(query));
    newQuery.limit = limit;
    newQuery.offset = offset;
    return newQuery;
  }
  async pagination(obj, query, where, countOnPage, page, onSuccess = null, data = null)
  {
     if(page === undefined || page === null || page === 0)
       page = -1;
     if(page < 0)
       return this.request(obj, query, where, onSuccess, data);
     const countQuery = this.makeCountQuery(query);
     const countRecords = await this.request(obj, countQuery, where);
     if(!countRecords.ok)
       return countRecords;
     const total = countRecords.data[0].cnt;

     const limit = countOnPage;
     const offset = (page-1)*limit;
     let numberPages = (total - total % limit) / limit + 1;
     if(total % limit == 0)
       numberPages--;
                      
     const pagination = {page, numberPages, countOnPage};

     const pageQuery = this.getPageQuery(query, limit, offset);

     const resultRecords = await this.request(obj, pageQuery, where, onSuccess, data);
     if(!resultRecords.ok)
       return resultRecords;
                                                   
      resultRecords.pagination = pagination;
      return resultRecords;

  }
  async request(obj, query,  where, onSuccess = null, data = null) 
  {                                                                         
     query.where = where;
     try
     {

       let records = await obj.findAll(query);
       if(onSuccess !== null)
         records = await onSuccess(records, data);
       return {ok:true, error: '', data:records};
     }
     catch(e)
     {
        console.log(e.message);
        return {ok:false, error: e.message, data:null};
     }
  }
  async requestData(obj, query,  where, onSuccess = null, data = null) 
  {
     const request = await this.request(obj, query,  where, onSuccess, data);
     if(!request.ok)
        return [];
     return request.data;
  }
}