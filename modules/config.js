const express = require('express');
const app = express();

const dialogflowConfig = {
    projectId: process.env.PROJECT_ID,
    privateKey: process.env.PRIVATE_KEY,
    clientEmail: process.env.CLIENT_EMAIL
};

module.exports = dialogflowConfig;