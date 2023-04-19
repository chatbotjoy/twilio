exports.handler = async function (context, event, callback) {
  const fetch = require("node-fetch");

  const fields = {
    "Date sent": new Date().toString(),
    Message: event.Body,
    "Phone number": event.From,
  };

  try {
    const response = await fetch(process.env.AIRTABLE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    });
    callback(null, response);
  } catch (err) {
    callback(err);
  }
};

  const fetch = require("node-fetch");

  const fields = {
    "Data sent": event.created_at,
    Message: event.Body,
    "Phone number": event.From,
  };

  try {
    const response = await fetch(process.env.AIRTABLE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    });
    callback(null, response);
  } catch (err) {
    callback(err);
  }
};

  const fetch = require("node-fetch");
  console.log("event", event);
  const fields = {
    "Data sent": event.created_at,
    Message: event.Body,
    "Phone number": event.From,
  };

  try {
    const response = await fetch(process.env.AIRTABLE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    });
    callback(null, response);
  } catch (err) {
    callback(err);
  }
};
