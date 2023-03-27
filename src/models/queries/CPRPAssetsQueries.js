
const PRPAssets = require('../db').PRPAssets;
const PRPAccounts = require('../db').PRPAccounts;
const PRPSubjectSpecification = require('../db').PRPSubjectSpecification;
const PRPTypeRelations = require('../db').PRPTypeRelations;
const PRPSubjects = require('../db').PRPSubjects;
const PRPPersons = require('../db').PRPPersons;
const PRPSubjectTypes = require('../db').PRPSubjectTypes;




export default class CPRPAssetsQueries
{
   static items()
   {
      return {
               attributes: ['uuid', 'name', 'description', 'mime'],
                order: [
                         ['createdAt', 'DESC'], 
                       ], 
                raw: true,
                nest: true,
                include: [{
                            model: PRPAccounts
                            ,attributes: ['uuid', 'login']
                            ,as: 'creater_data'
                            ,required: true
                          },
                          {
                            model: PRPSubjectSpecification
                            ,attributes: ['uuid', 'description']
                            ,as: 'subject_specification_data'
                            ,required: true
                            ,include: [{
                               model: PRPSubjects
                              ,attributes: ['uuid', 'name']
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
                            {
                               model: PRPSubjects
                              ,attributes: ['uuid', 'name']
                              ,as: 'subsubject_data'
                              ,required: false
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
                            {
                                 model: PRPPersons
                                ,attributes: ['uuid', 'first_name', 'middle_name', 'last_name', 'birth_date']
                                ,as: 'person_data'
                                ,required: false
                                ,include: [{
                                   model: PRPAccounts
                                  ,attributes: ['uuid', 'login']
                                  ,as: 'createAccount_data'
                                  ,required: true
                                }]
                             },

                            {
                                 model: PRPAccounts
                                ,attributes: ['uuid', 'login']
                                ,as: 'createAccount_data'
                                ,required: true
                             },
                             {
                                model: PRPTypeRelations
                               ,attributes: ['uuid', 'name']
                               ,as: 'relation_data'
                               ,required: true
                             },

                           ]

                          },
                          {
                            model: PRPSubjects
                            ,attributes: ['uuid', 'name']
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

