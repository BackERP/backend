const jwt = require('jsonwebtoken');
import {accessTokenSecret}  from '../config/config';
import CPRPAccounts from '../models/CPRPAccounts';


                                                  
const authenticateEmptyJWT = async (req, res, next) => {
    req.account = {uuid:undefined};
    next();
};

export default authenticateEmptyJWT;

