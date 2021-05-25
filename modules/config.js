const express = require('express');
const app = express();

const dialogflowConfig = {
    projectId: "first-bot-305315",
    privateKey: process.env.PRIVATE_KEY,
    clientEmail: "testbot@first-bot-305315.iam.gserviceaccount.com"
};

module.exports = dialogflowConfig;