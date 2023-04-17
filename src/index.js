const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

process.addListener('uncaughtException', (err) => {
 console.error(`[uncaughtException] err:${err.toString()}`, err);
});
process.addListener('unhandledRejection', (err) => {
 console.error(`[unhandledRejection] err:${err.toString()}`, err);
});

const setupMongoDB = require('./setup/mongoose');
const API = require('./api');

const app = express();

const bootstrap = async () => {
 app.use(cors());
 app.use(bodyParser.json());

 await setupMongoDB();

 app.use(API.router);

 app.listen(process.env.PORT, () => console.log(`Server was started on ${process.env.PORT}`));
};

bootstrap();