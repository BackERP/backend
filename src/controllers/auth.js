const jwt = require('jsonwebtoken');
import {accessTokenSecret, refreshTokenSecret, refreshTokens}  from '../config/config';
import CPRPAccounts from '../models/CPRPAccounts';
const formidable = require('formidable');


module.exports = {

  async login(req, res){

    const { login, password} = req.body;

    // Filter user from the users array by username and password
    const account = new CPRPAccounts();
    const rs = await account.login(login, password);

    console.log(rs);
    if (rs.ok) {
        // Generate an access token
        const access_token = jwt.sign({uuid: rs.data.uuid}, accessTokenSecret, { expiresIn: '24h' });
        const refresh_token = jwt.sign({uuid: rs.data.uuid}, refreshTokenSecret);

        refreshTokens.push(refresh_token);
        const error = '';
        res.json({
            ok:true,
            uuid: rs.data.uuid,
            login: rs.data.login,
            access_token,
            refresh_token,
            roles:['MANAGER'],
            error
        });
    } else {
        const error = rs.error;
        res.json({
            ok: rs.ok,
            error
        });
    }
  },
  logout(req, res){           
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);
    res.json({ok:true});
  },
  async signup(req, res){

    const { login, password, confirm_password} = req.body;

    // Filter user from the users array by username and password
    const account = new CPRPAccounts();
    const rs = await account.signup(login, password, confirm_password);


    if (rs.ok) {
        // Generate an access token
        const access_token = jwt.sign({uuid: rs.data.uuid}, accessTokenSecret, { expiresIn: '20m' });
        const refresh_token = jwt.sign({uuid: rs.data.uuid}, refreshTokenSecret);

        refreshTokens.push(refresh_token);
        const error = '';
        res.json({
            ok:true,
            uuid: rs.data.uuid,
            login: rs.data.login,
            access_token,
            refresh_token,
            roles:['MANAGER'],
            error
        });
    } else {
        res.json({
            ok: rs.ok,
            error:rs.error
        });
    }
  },
  token(req, res){           
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, uuid) => {
        if (err) {
            return res.sendStatus(403);
        }

        const token = jwt.sign(uuid, accessTokenSecret, { expiresIn: '20m' });

        res.json({
            ok: rs.ok,
            token
        });
    });  
   },

}