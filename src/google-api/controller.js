/*
  Controller for managing the users Google Calendar.
*/
const { google } = require("googleapis");
const encrypt = require('../../utils/encrypt');

/*
eventDetails: {
  summary: string;
  description: string;
  startDateTime: string;
  endDateTime: string
}
*/
const addEventToGoogleCalendar = async (req, res) => {
  const accessToken = encrypt.decryptToken(req.user.access_token);
  if (!accessToken) {
    return res.status(403).json({ message: "No Google access token found" });
  }

  console.log("Incoming addEventToGoogleCalendar request:", req.body);
  if (!req.body.eventDetails || !req.body.eventDetails.summary || !req.body.eventDetails.description || !req.body.eventDetails.startDateTime || !req.body.eventDetails.endDateTime) {
    return res.status(400).json({ message: "Invalid Event Details" });
  }

  try {
    // Initialize Google Calendar API
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: "v3", auth });

    const event = {
      summary: req.body.eventDetails.summary || '',
      description: req.body.eventDetails.description || '',
      start: {
        dateTime: req.body.eventDetails.startDateTime, // Example: "2025-03-20T10:00:00-07:00"
        timeZone: 'UTC',
      },
      end: {
        dateTime: req.body.eventDetails.endDateTime,
        timeZone: 'UTC',
      },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    res.status(200).json({ message: "Event added to calendar", fixture: response.data.summary });
  } catch (error) {
    console.error("Google Calendar API Error:", error);
    res.status(500).json({ message: "Failed to create event", error: error.message });
  }
};

module.exports = {
  addEventToGoogleCalendar,
};