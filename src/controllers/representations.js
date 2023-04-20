import CPRPMDBShemas from '../models/representations/CPRPMDBShemas';
import CRPRMDBAsset from '../models/representations/CRPRMDBAsset';
import CRPRMDBPerson from '../models/representations/CRPRMDBPerson';
import CRPRMDBSubject from '../models/representations/CRPRMDBSubject';




module.exports = {

  async get(req, res){ //get one 
    const {name} = req.query;

    res.json(await (new CPRPMDBShemas).get(name));
  },

  async list(req, res){  //get list
    const {page, countItems} = req.query;
    res.json(await (new CPRPMDBShemas).list());

//    res.json(await (new CPRPAccountSubjects).list(req.account, page, countItems));
  },


  async seed(req, res){  // create item

    res.json(await (new CPRPMDBShemas).seed());

//    res.json(await (new CPRPAccountSubjects).create(req.account, {name, subject}));

  },
  async seedSubjects(req, res){  // create item

    res.json(await (new CRPRMDBSubject).fillFromAccounting());

//    res.json(await (new CPRPAccountSubjects).create(req.account, {name, subject}));

  },
  async seedPersons(req, res){  // create item

    res.json(await (new CRPRMDBPerson).fillFromAccounting());

//    res.json(await (new CPRPAccountSubjects).create(req.account, {name, subject}));

  },
  async seedAssets(req, res){  // create item

    res.json(await (new CRPRMDBAsset).fillFromAccounting());

//    res.json(await (new CPRPAccountSubjects).create(req.account, {name, subject}));

  },

}
