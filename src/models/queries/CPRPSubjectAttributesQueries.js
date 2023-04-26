
const PRPSubjectAttributes = require('../db').PRPSubjectAttributes;
const PRPAccounts = require('../db').PRPAccounts;
const PRPSubjects = require('../db').PRPSubjects;
const PRPSubjectTypeAttributes = require('../db').PRPSubjectTypeAttributes;
const PRPSubjectTypes = require('../db').PRPSubjectTypes;






export default class CPRPSubjectAttributesQueries
{
   static items()
   {
      return {
               attributes: ['uuid', 'text_value', 'string_value', 'integer_value', 'double_value'],
                order: [
                         ['createdAt', 'DESC'], 
                       ], 
                raw: true,
                nest: true,
                include: [{
                            model: PRPSubjectTypeAttributes
                            ,attributes: ['uuid', 'name', 'type_value', 'order']
                            ,as: 'attribute_data'
                            ,required: true
                            ,include: [{
                               model: PRPSubjectTypes
                              ,attributes: ['uuid', 'name']
                              ,as: 'type_data'
                              ,required: true
                            }]
                          },
                          {
                            model: PRPSubjects
                            ,attributes: ['uuid', 'name', 'inner_name']
                            ,as: 'subject_data'
                            ,required: true
                            ,include: [{
                               model: PRPAccounts
                              ,attributes: ['uuid', 'login']
                              ,as: 'createAccount_data'
                              ,required: true
                            },
                            {
                               model: PRPSubjectTypes
                              ,attributes: ['uuid', 'name']
                              ,as: 'subject_type_data'
                              ,required: true
                            }]
                          },
                       ]
             }
   }
}

