const ngrok = require('ngrok');
require('dotenv').config();
console.log(process.env.PORT)
console.log(process.env.SOCKET_PORT)
const bootstrap = async () => {
 await ngrok.authtoken(process.env.NGROK_AUTH_TOKEN);
 const base_url = await ngrok.connect({
  addr: process.env.PORT
 });
 const socket_base_url = await ngrok.connect({ proto: 'tcp', addr: process.env.SOCKET_PORT });
 console.log(`base_url:${base_url}`);
 console.log(`socket_base_url:${socket_base_url}`);
};

bootstrap();