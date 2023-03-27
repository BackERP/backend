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










}