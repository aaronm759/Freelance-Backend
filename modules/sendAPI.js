const fetch = require('node-fetch')



function callSendAPI(sender_psid, response) {

    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }
    let options = {

        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request_body)

    };
    let token = process.env.PAGE_ACCESS_TOKEN;
    let url = 'https://graph.facebook.com/v2.6/me/messages?access_token=' + token;


    fetch(url, options)
        .then((res) => {
            console.log('message sent!')

        }).catch((error) => {
            console.log(error)
        });
}

module.exports = callSendAPI;