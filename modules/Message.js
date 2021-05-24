const talkToChatbot = require("./chatbot");
const callSendAPI = require("./sendAPI")
const contactable = require("./availability")




function handleMessages(sender_psid, message) {

    let aiBot;

    talkToChatbot(message, aiBot)
        .then((aiResponse) => {
            console.log(aiResponse)
            let response;
            let intentName = aiResponse["intent"]["displayName"]
            console.log(intentName)

            let dayOfWeek = contactable()
            console.log(dayOfWeek[0])



            if (intentName == 'appointment set up') {

                response = {
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "text": "When would you like to talk?",
                            "template_type": "button",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": `${dayOfWeek[0]}`,
                                    "payload": "time_needed"

                                },
                                {
                                    "type": "postback",
                                    "title": `${dayOfWeek[1]}`,
                                    "payload": "time_needed",

                                },
                                {
                                    "type": "postback",
                                    "title": "More Days",
                                    "payload": "more_days",
                                }
                            ]
                        }
                    }
                }
                callSendAPI(sender_psid, response);

            } else {
                aiBot = aiResponse["fulfillmentText"]
                response = {
                    "text": aiBot
                }
                callSendAPI(sender_psid, response);

            }




        })
        .catch((error) => {
            console.log("Something went wrong: " + error);
            res.send({
                error: "Error occured here"
            });
        });



}

module.exports = handleMessages;