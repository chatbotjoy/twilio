exports.handler = async function (context, event, callback) {
  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `Extract morning or afternoon from the following text. If it can't be extracted, display Unknown.

  Text: ${event.Body.trim()}
  
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

  let result = response.data.choices[0].text.trim().toLowerCase();

  callback(null, { result });
};
