
const dialogflow = require("@google-cloud/dialogflow");

const dialogflowConfig = require("./config");
const projectId = dialogflowConfig.projectId;
const configuration = {
    credentials: {
        private_key: dialogflowConfig.privateKey,
        client_email: dialogflowConfig.clientEmail
    }
};

const sessionId = "987654";
const languageCode = "en-US";
const sessionClient = new dialogflow.SessionsClient(configuration);

const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

async function talkToChatbot(message) {
    console.log("message " + message);
    const botRequest = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode
            }
        }
    };

    const aiResponse = await sessionClient
        .detectIntent(botRequest)
        .then((responses) => {

            const requiredResponse = responses[0].queryResult;
            return requiredResponse;
        })
        .catch((error) => {
            console.log("ERROR: " + error);
        });

    return aiResponse;
};

module.exports = talkToChatbot;
