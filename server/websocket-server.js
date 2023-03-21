const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const events = require('events');
const path = require('path');
const setTelegramBot = require('./telegram_bot');
require('./websocket');

const emitter = new events.EventEmitter();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public/dist')));

app.get('/login', (req, res) => {
 const { id } = req.query;
 if (!id) {
  return res.status(400).send({
   message: 'parameter id is required'
  });
 }
 console.log(`Wait on login id:${id}`);
 emitter.once(`login-${id}`, (userInfo) => {
  res.status(200).send(userInfo);
 });
});

setTelegramBot(app, emitter);

app.listen(process.env.PORT, () => console.log(`Server was started on ${process.env.PORT}`));