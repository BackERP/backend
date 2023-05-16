require('dotenv').config()

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshTokens = [];
const getWayImage = 'https://cloudflare-ipfs.com'; //'https://gateway.pinata.cloud';
const countRecordsOnPage = process.env.COUNT_RECORDS_ON_PAGE;
const FILESTORAGEPATH = 'files/';
const SERVER_URL = process.env.SERVER_URL;
const MONGODB = process.env.MONGODB;
const MAIL_PORT=process.env.MAIL_PORT
const MAIL_HOST=process.env.MAIL_HOST
const MAIL_USER=process.env.MAIL_USER
const MAIL_PASSWORD=process.env.MAIL_PASSWORD
const MAIL_MANAGER = process.env.MAIL_MANAGER

                                                                                                         

export {accessTokenSecret, 
        refreshTokenSecret, 
        refreshTokens, 
        getWayImage, 
        countRecordsOnPage, 
        FILESTORAGEPATH, 
        SERVER_URL, 
        MONGODB, 
        MAIL_PORT, 
        MAIL_HOST,
        MAIL_USER,
        MAIL_PASSWORD,
        MAIL_MANAGER
      };
