const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { setupDb } = require('./setup/mongoose');
const Items = require('./api/items');
const Movies = require('./api/movies');
const Middleware = require('./middleware');

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const setup = async () => {

  await setupDb(process.env.MONGO_DB_URI);

  app.use((req, res, next) => {
    console.log(1);
    next();
  });

  app.use(Middleware.authorization);
  
  app.use((req, res, next) => {
    console.log(2);
    next();
  });

  app.use(Items.router);
  app.use(Movies.router);

  app.listen(process.env.PORT, () => {
    console.log("server started");
  });
};

setup();
