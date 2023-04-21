import CPRPImageHelper from '../helpers/CPRPImageHelper';

module.exports = {

  async minimizeImages(req, res){ //get one 
    const {uuid} = req.query;
    res.json(await CPRPImageHelper.minimizeAll());
  },
}
