
const typeValues = [{intValue: 1, strValue:'string'},
                    {intValue: 2, strValue:'text'},
                    {intValue: 3, strValue:'url'},
                    {intValue: 4, strValue:'media'}
                   ];

export class ConvertTypeValue
{
    static getByString(strValue)
    {
       const list = typeValues.filter((obj)=>obj.strValue==strValue);
       if(list.length > 0)
         return list[0].intValue;
       return -1;
    }
    static getByInt(intValue)
    {
       const list = typeValues.filter((obj)=>obj.intValue==intValue);
       if(list.length > 0)
         return list[0].strValue;
       return 'undefined type';
    }

}

