
//States of art on sale
export class TypeDocuments
{

   static get returnAsset() 
   {
      return '1ff9492f-4b12-4e78-ba3c-bfaceb2fb261'; 
   }
   static get order() 
   {
      return '2673f363-bed3-47d0-8097-4e62c0d929af'; 
   }
   static get paid() 
   {
      return '411bf6bf-015d-43a0-8637-a5541348807b';
   }
   static get mint() 
   {
      return '60e9f028-5043-4811-b5df-7c69bfb070dd';
   }
   static get issue() 
   {
      return '6b028e9f-0c1a-49e5-bd33-fd517b51e61b';
   }
   static get delivery() 
   {
      return '79626944-eb38-4290-a554-243640efc901';
   }
   static get offer() 
   {
      return 'aebf82ec-ed39-4b70-9e28-47c99b34e159';
   }
   static get income_invoice() 
   {
      return 'c7f4910e-535a-47c6-8785-eee827eb67cf';
   }
}

class ReturnStates
{
   static get draft() 
   {
      return '3122315b-4e4a-43d9-9505-84e89cd35444';
   }
   static get completed() 
   {
      return 'fdf2e79b-0a20-4a6b-be6d-f796a9589151';
   }
   static get cancel() 
   {
      return '9725ceca-7bdc-41f1-accc-80a11446edd4';
   }
}

class OrderStates
{
   static get draft() 
   {
      return '0b8b3130-63d4-4988-bcfb-61c9d2839ac8';
   }
   static get completed() 
   {
      return '6a73a3c7-85b3-496f-9be6-8783f099fadb';
   }
   static get cancel() 
   {
      return 'b5d38694-d0ea-46a1-83af-095b6fb7178b';
   }
}

class PaidStates
{
   static get draft() 
   {
      return 'c16a26f5-8820-4151-9659-c28b4a2e083b';
   }
   static get completed() 
   {
      return '027e153f-5c98-4cd7-90aa-fec1fa3f7b7f';
   }
   static get cancel() 
   {
      return 'f5dc3866-f4eb-40d3-8bb5-02b990dce6b6';
   }
}

class MintStates
{
   static get draft() 
   {
      return '262e2f30-f58c-4df5-9170-26f0d126af1e';
   }
   static get completed() 
   {
      return 'dfab314b-a251-40a1-ae2f-5e1ce8b8f788';
   }
   static get cancel() 
   {
      return '6a142dc7-88a4-4fee-a883-bb634946ce59';
   }
}

class IssueStates
{
   static get draft() 
   {
      return '928c331a-72f4-4a20-b54a-f590e0025997';
   }
   static get completed() 
   {
      return '831ea58b-9405-46b6-9569-2995cfa8cb91';
   }
   static get cancel() 
   {
      return '1b284117-b51d-4e2a-b526-bd43745c711f';
   }
}

class DeliveryStates
{
   static get draft() 
   {
      return 'b77c5853-7300-433f-bea4-c933d5ab52fa';
   }
   static get completed() 
   {
      return 'f6e2b9d3-825a-4de2-90a7-7bb73af01307';
   }
   static get cancel() 
   {
      return 'e81a0704-6e0f-409a-aef6-99ff4796bdf5';
   }
}

class OfferStates
{
   static get draft() 
   {
      return '75b6b9d4-3991-40dc-b506-486f890f2d81';
   }
   static get completed() 
   {
      return '568852db-5fee-450a-8e11-52a2ff6b92bc';
   }
   static get cancel() 
   {
      return '5aa92bc5-e5d4-4db2-aab8-f6f87756c625';
   }
}

class IncomeInvoiceStates
{
   static get draft() 
   {
      return '539f5a72-e111-406e-a1bc-9107ee1043f0';
   }
   static get completed() 
   {
      return '2c129624-276d-4681-a060-029cefab9fbf';
   }
   static get cancel() 
   {
      return '9bea2bea-e5cd-4264-9e81-bd8f294a648a';
   }
}

export class DocumentsStates
{
   static get returnAsset() 
   {
      return ReturnStates; 
   }
   static get order() 
   {
      return OrderStates; 
   }
   static get paid() 
   {
      return PaidStates;
   }
   static get mint() 
   {
      return MintStates;
   }
   static get issue() 
   {
      return IssueStates;
   }
   static get delivery() 
   {
      return DeliveryStates;
   }
   static get offer() 
   {
      return OfferStates;
   }
   static get income_invoice() 
   {
      return IncomeInvoiceStates;
   }
}
//export const saleState = new SaleState;