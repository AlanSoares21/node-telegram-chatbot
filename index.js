require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const dialogFlow = require('./dialogFlow');
const youtube = require('./youtube');

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});//ideal é utilizar webhooks

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;//id da conversa
  const responseDialogFlow = await dialogFlow.sendMessage(chatId.toString(), msg.text);
  // console.log(responseDialogFlow);
  let responseText = "";
  try{
    responseText = responseDialogFlow.text;
    if(responseDialogFlow.intent === 'treino'){
      responseText = youtube.searchVideoURl(responseText, responseDialogFlow.fields.Corpo.stringValue)
      responseText.catch(console.error);
    }
  }catch(err){
    console.error(err);
    responseText = null;
  }    
  bot.sendMessage(chatId, await responseText || "Desculpe não consigo te responder") ;
});

  
