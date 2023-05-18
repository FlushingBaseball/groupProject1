// async function main() {
//   const { Configuration, OpenAIApi } = require("openai");
//   const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
//   });
//   const openai = new OpenAIApi(configuration);
//   const response = await openai.createEdit({
//     model: "text-davinci-edit-001",
//     input: "What day of the wek is it?",
//     instruction: "Fix the spelling mistakes",
//   });

//   // Print the edited text.
//   console.log(response.data.choices[0].text);
// }

// main();

async function main() {
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{role: "user", content: "How are you?"}],
  max_tokens: 50
});
console.log(completion.data.choices[0].message.content);
}

main()
