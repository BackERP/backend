const jwt = require('jsonwebtoken');
import {accessTokenSecret}  from '../config/config';
import CPRPAccounts from '../models/CPRPAccounts';


                                                  
const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
               const auth = jwt.verify(token, accessTokenSecret);
               const rs = await (new CPRPAccounts()).getAccount(auth.uuid);
               if(!rs.ok)
                  return res.sendStatus(401);
               req.account =rs.data;
               next();

            } catch(err) {
               res.sendStatus(401);
            }

    } else {
        res.sendStatus(401);
    }
};

export default authenticateJWT;

