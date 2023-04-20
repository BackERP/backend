import CPRPAccountsQueries from './queries/CPRPAccountsQueries';
import CPRPAccountSubjectsQueries from './queries/CPRPAccountSubjectsQueries';
import CPRPAssetsMetaDataProvidersQueries from './queries/CPRPAssetsMetaDataProvidersQueries';
import CPRPAssetsMetaDataResourcesQueries from './queries/CPRPAssetsMetaDataResourcesQueries';
import CPRPAssetsProvidersQueries from './queries/CPRPAssetsProvidersQueries';
import CPRPAssetsQueries from './queries/CPRPAssetsQueries';
import CPRPAssetsResourcesQueries from './queries/CPRPAssetsResourcesQueries';
import CPRPPersonAccountsQueries from './queries/CPRPPersonAccountsQueries';
import CPRPPersonDetailsQueries from './queries/CPRPPersonDetailsQueries';
import CPRPPersonsQueries from './queries/CPRPPersonsQueries';
import CPRPSubjectAttributesQueries from './queries/CPRPSubjectAttributesQueries';
import CPRPSubjectSpecificationQueries from './queries/CPRPSubjectSpecificationQueries';
import CPRPSubjectsQueries from './queries/CPRPSubjectsQueries';
import CPRPSubjectTypeAttributesQueries from './queries/CPRPSubjectTypeAttributesQueries';
import CPRPSubjectTypesQueries from './queries/CPRPSubjectTypesQueries';
import CPRPTypeRelationsQueries from './queries/CPRPTypeRelationsQueries';
import CPRPCurrenciesQueries from './queries/CPRPCurrenciesQueries';
import CPRPSaleDocumentStatesQueries from './queries/CPRPSaleDocumentStatesQueries';
import CPRPBuyDocumentStatesQueries from './queries/CPRPBuyDocumentStatesQueries';
import CPRPSaleDocumentsQueries from './queries/CPRPSaleDocumentsQueries';
import CPRPSaleDocumentSpecificationsQueries from './queries/CPRPSaleDocumentSpecificationsQueries';
import CPRPSaleRegistrsQueries from './queries/CPRPSaleRegistrsQueries';
import CPRPBuyDocumentsQueries from './queries/CPRPBuyDocumentsQueries';
import CPRPBuyDocumentSpecificationsQueries from './queries/CPRPBuyDocumentSpecificationsQueries';
import CPRPBuyRegistrsQueries from './queries/CPRPBuyRegistrsQueries';

import CPRPBookRecordsQueries from './queries/CPRPBookRecordsQueries';
import CPRPDocumentSpecificationsQueries from './queries/CPRPDocumentSpecificationsQueries';
import CPRPDocumentsQueries from './queries/CPRPDocumentsQueries';
import CPRPDocumentStatesQueries from './queries/CPRPDocumentStatesQueries';
import CPRPTypeDocumentsQueries from './queries/CPRPTypeDocumentsQueries';
import CPRPBooksQueries from './queries/CPRPBooksQueries';
import CPRPSubjectContactsQueries from './queries/CPRPSubjectContactsQueries';
import CPRPDocumentContactsQueries from './queries/CPRPDocumentContactsQueries';
import CPRPMarketOffersQueries from './queries/CPRPMarketOffersQueries';
import CPRPSubjectTypeContactsQueries from './queries/CPRPSubjectTypeContactsQueries';
import CPRPMarketsMarketPlacesQueries from './queries/CPRPMarketsMarketPlacesQueries';
import CPRPMarketsQueries from './queries/CPRPMarketsQueries';
import CPRPMarketPlacesQueries from './queries/CPRPMarketPlacesQueries';
import CPRPLocalesQueries from './queries/CPRPLocalesQueries';
import CPRPLanguagesQueries from './queries/CPRPLanguagesQueries';
import CPRPRegionsQueries from './queries/CPRPRegionsQueries';
import CPRPCountriesQueries from './queries/CPRPCountriesQueries';






export default class CPRPQueryLib
{
   static get accounts()
   {
     return CPRPAccountsQueries;
   }

   static get account_subjects()
   {
     return CPRPAccountSubjectsQueries;
   }
   static get assets_meta_data_providers()   
   {
     return CPRPAssetsMetaDataProviders;
   }
   static get assets_meta_data_resources()
   {
     return CPRPAssetsMetaDataResourcesQueries;
   }
   static get assets_providers()
   {
     return CPRPAssetsProvidersQueries;
   }
   static get assets()
   {
     return CPRPAssetsQueries;
   }
   static get assets_resources()
   {
     return CPRPAssetsResourcesQueries;
   }
   static get person_accounts()
   {
     return CPRPPersonAccountsQueries;
   }
   static get person_details()
   {
     return CPRPPersonDetailsQueries;
   }
   static get persons()
   {
     return CPRPPersonsQueries;
   }
   static get subject_attributes()
   {
     return CPRPSubjectAttributesQueries;
   }
   static get subject_specification()
   {
     return CPRPSubjectSpecificationQueries;
   }
   static get subjects()
   {
     return CPRPSubjectsQueries;
   }
   static get subject_type_attributes()
   {
     return CPRPSubjectTypeAttributesQueries;
   }
   static get subject_types()
   {
     return CPRPSubjectTypesQueries;
   }
   static get currencies()
   {
     return CPRPCurrenciesQueries;
   }
   static get sale_document_states()
   {
     return CPRPSaleDocumentStatesQueries;
   }
   static get buy_document_states()
   {
     return CPRPBuyDocumentStatesQueries;
   }
   static get sale_documents()
   {
     return CPRPSaleDocumentsQueries;
   }
   static get sale_document_specifications()
   {
     return CPRPSaleDocumentSpecificationsQueries;
   }
   static get sale_registrs()
   {
     return CPRPSaleRegistrsQueries;
   }
   static get buy_documents()
   {
     return CPRPBuyDocumentsQueries;
   }
   static get buy_document_specifications()
   {
     return CPRPBuyDocumentSpecificationsQueries;
   }
   static get buy_registrs()
   {
     return CPRPBuyRegistrsQueries;
   }
   static get type_relations()
   {
     return CPRPTypeRelationsQueries;
   }

   static get books()
   {
     return CPRPBooksQueries;
   }
   static get type_documents()
   {
     return CPRPTypeDocumentsQueries;
   }
   static get document_states()
   {
     return CPRPDocumentStatesQueries;
   }
   static get documents()
   {
     return CPRPDocumentsQueries;
   }
   static get document_specifications()
   {
     return CPRPDocumentSpecificationsQueries;
   }
   static get book_records()
   {
     return CPRPBookRecordsQueries;
   }

   static get subject_contacts()
   {
     return CPRPSubjectContactsQueries;
   }
   static get document_contacts()
   {
     return CPRPDocumentContactsQueries;
   }
   static get market_offers()
   {
     return CPRPMarketOffersQueries;
   }
   static get subject_type_contacts()
   {
     return CPRPSubjectTypeContactsQueries;
   }
   static get market_marketplace()
   {
     return CPRPMarketsMarketPlacesQueries;
   }
   static get markets()
   {
     return CPRPMarketsQueries;
   }
   static get marketplaces()
   {
     return CPRPMarketPlacesQueries;
   }
   static get locales()
   {
     return CPRPLocalesQueries;
   }
   static get languages()
   {
     return CPRPLanguagesQueries;
   }
   static get regions()
   {
     return CPRPRegionsQueries;
   }
   static get countries()
   {
     return CPRPCountriesQueries;
   }










}