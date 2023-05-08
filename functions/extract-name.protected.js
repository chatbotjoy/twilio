exports.handler = async function (context, event, callback) {
  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  let token;
  let result;

  const prompt = `Extract a the first and last name from the following text. If any names can't be extracted, display Unknown.
  Text: ${event.Body.trim()}
  |First name|Last name|
  `;

  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0,
    max_tokens: 10,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  result = response.data.choices[0].text.trim();

  if (result.includes(" ")) {
    token = " ";
  } else {
    token = "|";
  }

  result = result.split(token).filter((x) => x !== "");

  console.log(result);
  const json = { first_name: result[0], last_name: result[1] };

  callback(null, json);
};
