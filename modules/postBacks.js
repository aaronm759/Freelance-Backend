const callSendAPI = require("./sendAPI")
const contactable = require("./availability")
const schedule = require("./scheduleAppt");
const fs = require('fs')






function handlePostback(sender_psid, postback) {
    let response;
    console.log(postback)


    let payload = postback.payload;


    if (payload === "time_needed") {

        let x = postback.title
        let y = x.slice(4, 15)
        let exactDate = new Date(y).toISOString()
        let info = {
            "date": `${exactDate}`
        }

        fs.writeFile('./modules/day.json', JSON.stringify(info), (err) => {
            if (err) throw err;
        })



        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "text": "When would you like to talk?",
                    "template_type": "button",
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "9am - 10am",
                            "payload": "call_hour"

                        },
                        {
                            "type": "postback",
                            "title": "10am - 11am",
                            "payload": "call_hour"

                        },
                        {
                            "type": "postback",
                            "title": "11am - 12pm",
                            "payload": "call_hour"
                        }
                    ]
                }
            }
        }


    } else if (payload === "more_days") {

        let dayOfWeek = contactable()


        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "text": "When would you like to talk?",
                    "template_type": "button",
                    "buttons": [
                        {
                            "type": "postback",
                            "title": `${dayOfWeek[2]}`,
                            "payload": "time_needed"

                        },
                        {
                            "type": "postback",
                            "title": `${dayOfWeek[3]}`,
                            "payload": "time_needed",

                        },
                        {
                            "type": "postback",
                            "title": `${dayOfWeek[4]}`,
                            "payload": "time_needed",
                        }
                    ]
                }
            }
        }
    } else if (payload == 'call_hour') {

        let hour;

        if (postback.title == "9am - 10am") {
            hour = "09:00:00 10:00:00"
        } else if (postback.title == "10am - 11am") {
            hour = "10:00:00 11:00:00"
        } else {
            hour = "11:00:00 12:00:00"
        }

        let info2 = {
            "time": `${hour}`
        }

        fs.writeFileSync('./modules/time.json', JSON.stringify(info2))

        schedule();



    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
}

module.exports = handlePostback;
