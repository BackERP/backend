import {getWayImage}  from '../config/config';
import {FILESTORAGEPATH, SERVER_URL} from '../config/config';


export default class CPRPCommonHelper
{
  static pathIPFS(resource)
  {
     return  getWayImage + "/ipfs/" + resource;
  }
  static pathLocal(resource)
  {
     return SERVER_URL + '/' + FILESTORAGEPATH + resource;
  }
  static pathByProvider(provider, resource)
  {
     return provider == 'PinataIPFS'? CPRPCommonHelper.pathIPFS(resource):
            provider == 'Local'? CPRPCommonHelper.pathLocal(resource): 
            provider == 'External link'? resource: '';
  }
}