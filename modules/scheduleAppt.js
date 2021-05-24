const { google } = require('googleapis');
const fs = require('fs')



function setAppointment() {



    const client = new google.auth.GoogleAuth({
        keyFile: './modules/credentials.json',
        scopes: ['https://www.googleapis.com/auth/calendar'],
    })
    const idCalendar = process.env.GOOGLE_CALENDAR_ID;

    const calendar = google.calendar({ version: 'v3', auth: client })


    let x = fs.readFileSync('./modules/day.json')
    let day = JSON.parse(x)
    let dayS = day.date.slice(0, 11)
    console.log(dayS)

    let y = fs.readFileSync('./modules/time.json')
    let hour = JSON.parse(y)
    let begin = hour.time.slice(0, 7)
    let end = hour.time.slice(9, 16)
    console.log(hour)

    let dateStart = dayS + begin
    let dateEnd = dayS + end

    let event = {
        'description': 'potential client seeking information on chatbots',
        'start': {
            'dateTime': `${dateStart}`,
            'timeZone': 'America/New_York',
        },
        'end': {
            'dateTime': `${dateEnd}`,
            'timeZone': 'America/New_York',
        }
    }





    calendar.events.insert({
        calendarId: idCalendar,
        resource: event,
    }, function (err, event) {
        if (err) {
            console.log('There was an error contacting the Calendar service: ' + err);
            return;
        }
        console.log('Event created');
    });






}

module.exports = setAppointment;


