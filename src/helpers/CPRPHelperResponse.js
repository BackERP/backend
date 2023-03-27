export default class CPRPHelperResponse
{
  static mix(data)
  {
     let mixData = {};
     for(let key in data)
     {
        if(data[key].ok !== undefined)
        {
          if(!data[key].ok )
             return {ok:false, error: data[key].error, data: null};
        }
        mixData[key] = data[key].data;

     }
     return {ok:true, error: '', data: mixData};
  }                                                                  
  static setValue(data)
  {
     return {ok:true, error: '', data: data};
  }

}