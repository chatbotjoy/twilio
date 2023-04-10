const axios = require("axios");

exports.handler = async function (context, event, callback) {
  const data = {
    personalizations: [{ to: [{ email: context.TO_EMAIL_ADDRESS }] }],
    from: { email: context.FROM_EMAIL_ADDRESS },
    subject: `New SMS message from: ${event.From}`,
    content: [
      {
        type: "text/plain",
        value: event.Body,
      },
    ],
  };

  const config = {
    method: "POST",
    url: "https://api.sendgrid.com/v3/mail/send",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${context.SENDGRID_API_KEY}`,
    },
    data,
  };

  try {
    const response = await axios(config);
    const twiml = new Twilio.twiml.MessagingResponse();
    callback(null, twiml);
  } catch (err) {
    callback(err);
  }
};
