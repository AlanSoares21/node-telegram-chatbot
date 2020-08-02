require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});//ideal é utilizar webhooks

bot.on('message', (msg) => {
    const chatId = msg.chat.id;//id da conversa
    console.log(msg.text);
    bot.sendMessage(chatId, 'Received your message: '+msg.text);
  });