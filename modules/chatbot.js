
const dialogflow = require("@google-cloud/dialogflow");


/*
for local dev
const projectId = process.env.PROJECT_ID;
const configuration = {
    credentials: {
        "private_key": process.env.PRIVATE_KEY,
        "client_email": process.env.CLIENT_EMAIL
    }
};

*/

const keysenvvar = process.env.GOOGLE_CREDENTIALS;
const keys = JSON.parse(keysenvvar)
const projectId =  keys.project_id
const configuration = {
    credentials: {
        private_key: keys.private_key,
        client_email: keys.client_email
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
