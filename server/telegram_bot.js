const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_AUTH_TOKEN);

module.exports = async (app, emitter) => {
 const router = await bot.createWebhook({
  domain: process.env.BASE_URL
 });

 app.use(router);

 bot.start((ctx) => {
  ctx.reply('Welcome, use command "/login" to use your auth token\n\nExample: /login 12345-54645-564564...');
 });

 bot.command('login', (ctx) => {
  // ctx.text: "/login 123-43645-23423-234"
  // option 1
  // const token = ctx.message.text.replace('/login ', '');

  // option 2
  // const [command, token] = ctx.message.text.split(' ');

  // option 3
  // const token = ctx.message.text.slice('/login '.length);

  // option 4
  // const token =  ctx.message.text.match(/[a-z0-9-]+$/);

  const token = ctx.message.text.replace('/login ', '');
  console.log(`Try to login with token ${token}`);
  const userInfo = {
   firstName: ctx.from.first_name,
   lastName: ctx.from.last_name,
  };
  emitter.emit(`login-${token}`, userInfo);
 });
};
