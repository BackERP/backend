const jwt = require('jsonwebtoken');
import {accessTokenSecret}  from '../config/config';
import CPRPAccounts from '../models/CPRPAccounts';



const authContext = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, async (err, uuid) => {
            if (err) {
                req.uuid = null;
                next();
            }
            const res = await (new CPRPAccounts()).getAccount(uuid);

            if(!res.ok)
              req.account = null;
            else
              req.account = res.data;
            next();
        });
    } else {
        req.account = null;
         next();
    }
};

export default authContext;

