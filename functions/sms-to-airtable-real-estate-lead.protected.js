exports.handler = async function (context, event, callback) {
  const fetch = require("node-fetch");

  const fields = {
    Name: event.name,
    Email: event.email,
    Phone: event.phone,
    "Property Type": event.property_type,
    City: event.city,
    Amenities: event.amenities,
    Budget: event.budget,
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
