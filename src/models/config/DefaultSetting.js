

const typeValues = [{intValue: 1, strValue:'string'},
                    {intValue: 2, strValue:'text'},
                    {intValue: 3, strValue:'url'},
                    {intValue: 4, strValue:'media'}
                   ];

export default class DefaultSetting
{
    static get currency()
    {
       return '9ac19c90-0f5f-4dc8-97a7-b6cf77804264';
    }
    static get physicProvider()
    {
       return '0a3238cc-0177-4f4c-b2a4-3459475aea45';
    }
    static get subject()
    {
       return '595e4e89-8877-444a-bb40-32d3dc3ee9ea';
    }

    static market(marketplace)
    {
       if(marketplace == 'joincharible')
         return '1c487808-b383-44b1-959c-e840f1f90d09';
       return 'e946b703-8ba3-41a1-a8d9-c3b07809e455';
    }


}

