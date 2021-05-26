const express = require('express');
const { google } = require('googleapis');
const app = express();

const SCOPES = 'https://www.googleapis.com/auth/calendar.events'
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY
const GOOGLE_CLIENT_EMAIL = JSON.parse(process.env.GOOGLE_CLIENT_EMAIL)
const GOOGLE_PROJECT_NUMBER = process.env.GOOGLE_PROJECT_NUMBER



app.get('/', (req, res) => {

    const jwtClient = new google.auth.JWT(
        GOOGLE_CLIENT_EMAIL,
        null,
        GOOGLE_PRIVATE_KEY,
        SCOPES
    );

    const calendar = google.calendar({
        version: 'v3',
        project: GOOGLE_PROJECT_NUMBER,
        auth: jwtClient
    });
})