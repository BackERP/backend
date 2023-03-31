const express = require('express')
const cors = require('cors');
const formidable = require('formidable');
const fs = require("fs");
const FormData = require("form-data");
const pinataSDK = require('@pinata/sdk');
require('dotenv').config()
const authRouter = require('./src/routes/auth');
const storageRouter = require('./src/routes/storage');

const accountsubjectsRouter = require('./src/routes/accountsubjects');
const assetsRouter = require('./src/routes/assets');
const assetsmetadataprovidersRouter = require('./src/routes/assetsmetadataproviders');
const assetsmetadataresourcesRouter = require('./src/routes/assetsmetadataresources');
const assetsprovidersRouter = require('./src/routes/assetsproviders');
const assetsresourcesRouter = require('./src/routes/assetsresources');
const personaccountsRouter = require('./src/routes/personaccounts');
const persondetailsRouter = require('./src/routes/persondetails');
const personsRouter = require('./src/routes/persons');
const subjectattributesRouter = require('./src/routes/subjectattributes');
const subjectsRouter = require('./src/routes/subjects');
const subjectspecificationRouter = require('./src/routes/subjectspecification');
const subjecttypeattributesRouter = require('./src/routes/subjecttypeattributes');
const subjecttypesRouter = require('./src/routes/subjecttypes');
const typerelationsRouter = require('./src/routes/typerelations');
const offersRouter = require('./src/routes/offers');
const ordersRouter = require('./src/routes/orders');
const saleRegistrsRouter = require('./src/routes/saleregistrs');
const buyRegistrsRouter = require('./src/routes/buyregistrs');
const offerStatesRouter = require('./src/routes/offerstates');
const orderStatesRouter = require('./src/routes/orderstates');
const offerSpecificationRouter = require('./src/routes/offerspecification');
const orderSpecificationRouter = require('./src/routes/orderspecification');
const curreniesRouter = require('./src/routes/currenies');
const paymentsRouter = require('./src/routes/payments');










const path = require("path");

                                           



 
const api_version = 'v.1.0.0';


const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');



const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_PRIVATE_KEY);



const app = express()
const port = 3000


app.use(cors());
app.use(bodyParser.json());
app.use('/files', express.static("files"));

app.use('/'+ api_version + '/api/auth', authRouter);        //Логин
app.use('/'+ api_version + '/api/storage', storageRouter);  //загрузка ресурса

app.use('/'+ api_version + '/api/assetsproviders', assetsprovidersRouter); //провайдеры хранения ресурса
app.use('/'+ api_version + '/api/assetsmetadataproviders', assetsmetadataprovidersRouter); //провайдер хранения метаданных 

app.use('/'+ api_version + '/api/subjecttypes', subjecttypesRouter); //Тип субъекта
app.use('/'+ api_version + '/api/subjecttype/subjecttypeattributes', subjecttypeattributesRouter); //аттрибуты типа субъекта


app.use('/'+ api_version + '/api/assets', assetsRouter); //актив
app.use('/'+ api_version + '/api/asset/assetsmetadataresources', assetsmetadataresourcesRouter); //метаданные актива
app.use('/'+ api_version + '/api/asset/assetsresources', assetsresourcesRouter); //размещение ресурса актива

app.use('/'+ api_version + '/api/persons', personsRouter); // Персона
app.use('/'+ api_version + '/api/person/personaccounts', personaccountsRouter); //Аккаунт персоны
app.use('/'+ api_version + '/api/person/persondetails', persondetailsRouter); // Описание персоны

app.use('/'+ api_version + '/api/subjects', subjectsRouter); //Субъект
app.use('/'+ api_version + '/api/subject/subjectattributes', subjectattributesRouter); // Аттрибуты субъекта
app.use('/'+ api_version + '/api/subject/subjectspecification', subjectspecificationRouter); //Спецификация субъекта

app.use('/'+ api_version + '/api/account/accountsubjects', accountsubjectsRouter); // Субъекты аккаунта
app.use('/'+ api_version + '/api/typerelations', typerelationsRouter); // Типы отношений между субъектами

app.use('/'+ api_version + '/api/currencies', curreniesRouter); // Валюты

app.use('/'+ api_version + '/api/offers', offersRouter); // Предложения на продажу
app.use('/'+ api_version + '/api/offer/states', offerStatesRouter); // Состоянияп редложения на продажу
app.use('/'+ api_version + '/api/offer/specification', offerSpecificationRouter); // Спецификация предложения на продажу

app.use('/'+ api_version + '/api/orders', ordersRouter); // Заказ на покупку
app.use('/'+ api_version + '/api/order/states', orderStatesRouter); // Состояния заказа на покупку
app.use('/'+ api_version + '/api/order/specification', orderSpecificationRouter); // Спецификация заказа на покупку




app.use('/'+ api_version + '/api/registers/sale', saleRegistrsRouter); // Регистр продаж
app.use('/'+ api_version + '/api/registers/buy', buyRegistrsRouter); // Регистр покупок

app.use('/'+ api_version + '/api/payments', paymentsRouter); // Оплата на тильде







app.get('/', (request, response) => {
response.send('The Backend server is started.');
//    response.send(process.env.DB_HOST);
//    response.send('IPFS Provider is started')
})

const testAuthentication = () => {
   pinata.testAuthentication().then((result) => {
    //handle successful authentication here
    console.log(result);
  }).catch((err) => {
    //handle error here
    console.log(err);
  });
}




app.get('/test', (request, response) => {
   testAuthentication();
   response.send('IPFS Provider is started');
})

function getFilePath(req) {
    var form = new formidable.IncomingForm();
    return new Promise(function (resolve, reject) {
        form.parse(req, function (err, fields, files) {
            resolve({path: files.image.path, name: files.image.name});
        }); 
    });
}



app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})

module.exports = app;