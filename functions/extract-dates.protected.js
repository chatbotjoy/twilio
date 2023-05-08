exports.handler = async function (context, event, callback) {
  const Sherlock = require("sherlockjs");

  let date, time, hour, friendlyDate, json;

  const result = Sherlock.parse(event.Body.trim());

  if (result.startDate) {
    date = result.startDate.toLocaleDateString();
    time = result.startDate.toTimeString();
    hour = result.startDate.getHours();
    friendlyDate = result.startDate.toLocaleString("en-US", {
      weekday: "long", // long, short, narrow
      day: "numeric", // numeric, 2-digit
      month: "long", // numeric, 2-digit, long, short, narrow
    });

    json = { date, time, hour, friendlyDate };
  } else {
    hour = "Unknown";
    json = { date, time, hour, friendlyDate };
  }
  console.log(json);
  callback(null, json);
};
