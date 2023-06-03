exports.handler = async function (context, event, callback) {
  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  let result;
  console.log("event", event);

  let prompt = `Extract the property type from the following text. If any property types can't be extracted, display Unknown.
  Text: ${event.property_type.trim()}
  |Property type|
  `;
  result = await extractDataFromText(prompt, openai);
  const property_type = result[0];

  prompt = `Extract an area or city from the following text. If it can't be extracted, display Unknown.
  Text: ${event.city.trim()}
  |City|
  `;
  result = await extractDataFromText(prompt, openai);
  const city = result[0];

  prompt = `Extract a neighborhood and amenities from the following text. If it can't be extracted, display Unknown.
  Text: ${event.amenities.trim()}
  |neighborhood|amenity 1|amenity 2|amenity 3|amenity 4|amenity 5| amenity 6|
  `;
  result = await extractDataFromText(prompt, openai);
  neighborhood = result[0];
  amenities = result.slice(1, result.length);
  console.log("result =>", result);

  // const amenities = result.map((amenity) => {
  //   if (index > 0 && amenity !== "Unknown" && amenity !== undefined) {
  //     return amenity;
  //   }
  // });

  prompt = `Extract a budget from the following text and display it in currency format. If it can't be extracted, display Unknown.
  Text: ${event.budget.trim()}
  |budget|
  `;
  result = await extractDataFromText(prompt, openai);
  const budget = result[0];

  prompt = `Extract a person's contact information from the following text. If it can't be extracted, display Unknown.
  Text: ${event.contact.trim()}
  |Name|Email|Phone|
  `;

  result = await extractDataFromText(prompt, openai);
  const name = result[0];
  const email = result[1];
  const phone = result[2];

  const json = {
    name,
    email,
    phone,
    property_type,
    city,
    amenities,
    budget,
  };
  console.log("json", json);
  return callback(null, json);
};

const extractDataFromText = async (prompt, openai) => {
  const token = "|";

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0,
    max_tokens: 10,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  const result = response.data.choices[0].text
    .trim()
    .split(token)
    .filter((x) => x.length > 0);

  return result;
};
