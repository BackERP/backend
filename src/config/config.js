require('dotenv').config()

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshTokens = [];
const getWayImage = 'https://cloudflare-ipfs.com'; //'https://gateway.pinata.cloud';
const countRecordsOnPage = process.env.COUNT_RECORDS_ON_PAGE;
const FILESTORAGEPATH = 'files/';
const SERVER_URL = process.env.SERVER_URL;
                                                                                                         

export {accessTokenSecret, refreshTokenSecret, refreshTokens, getWayImage, countRecordsOnPage, FILESTORAGEPATH, SERVER_URL};
