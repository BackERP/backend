import {getWayImage}  from '../config/config';
import {FILESTORAGEPATH, SERVER_URL} from '../config/config';
import { translate } from '@vitalets/google-translate-api';
import createHttpProxyAgent from 'http-proxy-agent';
import fetch from 'node-fetch';


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
  static pathMinLocal(resource)
  {
     return SERVER_URL + '/' + FILESTORAGEPATH + 'minimized/'+ resource;
  }

  static pathByProvider(provider, resource)
  {
     return provider == 'PinataIPFS'? CPRPCommonHelper.pathIPFS(resource):
            provider == 'Local'? CPRPCommonHelper.pathMinLocal(resource): 
            provider == 'External link'? resource: '';
  }
  static async translate(text, lang)
  {
//     translate.engine = "yandex"; // "google", "yandex", "libre", "deepl"
//    translate.key = process.env.DEEPL_KEY;
    if(text == "")
      return text;
    if(lang == "ru")
      return text;
//    const tr = await translate(text, lang);
//    console.log(tr, tr);

//    const  agent  =  createHttpProxyAgent ( 'http://103.152.112.162:80' ) ; 
//    const  tr  = await translate(text, { to: lang, fetchOptions : { agent } });

    const res = await fetch("http://localhost:5000/translate", {
                      	     method: "POST",
                             body: JSON.stringify({
       		             q: text,
  		             source: "ru",
 		             target: lang,
		             format: "html",
		             api_key: ""
	                   }),
	                   headers: { "Content-Type": "application/json" }
               });

    const tr =  (await res.json());
    console.log('tr', tr);

    console.log('text', tr.translatedText);


    return tr.translatedText;
  }
}