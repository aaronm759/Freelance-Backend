const express = require('express')
const bodyParser = require('body-parser')
const app = express().use(bodyParser.json());
const cors = require("cors")
const fetch = require('node-fetch');


require('dotenv').config();
app.use(cors());
app.use(express.static('public'));


app.listen(process.env.PORT || 5000, (err) => {
    if (err) throw err
    console.log('webhook is listening');
})




const handleMessages = require("./modules/Message");
const handlePostback = require("./modules/postBacks");






app.post('/webhook', (req, res) => {

    let body = req.body;

    if (body.object === 'page') {


        body.entry.forEach(function (entry) {

            let webhook_event = entry.messaging['0'];
            let sender_psid = webhook_event.sender.id;


            console.log(webhook_event)

            if (webhook_event.message) {

                let message = webhook_event.message.text;

                handleMessages(sender_psid, message);
            } else if (webhook_event.postback) {

                let postback = webhook_event.postback
                handlePostback(sender_psid, postback);
            }


        });

        res.status(200).send('EVENT_RECIEVED');
    } else {
        res.sendStatus(404);
    }
});

app.get('/webhook', (req, res) => {

    let VERIFY_TOKEN = process.env.VERIFY_TOKEN

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {

        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }

});

app.post('/formdata', (request, response) => {
    let contact = request.body
    let name = contact.name
    let email = contact.email
    let phone = contact.phone
    let message = contact.message

    let clientInfo = `Name:${name} Email:${email}
    Phone:${phone} Message:${message}`;

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: clientInfo,
            from: '+12029145289',
            to: '+17328829663'
        })
        .then(message => console.log('text sent'));




});



