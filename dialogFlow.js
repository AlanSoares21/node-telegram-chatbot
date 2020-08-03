const dialogFlow = require('dialogFlow');
const config = require('./dialogKey.json');

const sessionClient = new dialogFlow.SessionsClient({
    projectId : config.project_id,
    credentials:{
        private_key: config.private_key,
        client_email: config.client_email
    }
});
async function sendMenssage(chatId,message){
    const sessionPath = sessionClient.sessionPath(config.project_id,chatId);
    const request ={
        session: sessionPath,
        queryInput:{
            text:{
                text: message,
                languageCode:'pt-BR'
            }
        }
    };
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    console.log(result.fulfillmentText);
}

sendMenssage('12345','ola');