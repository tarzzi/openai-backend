// require the OpenAI SDK
const {
  OpenAIApi,
  Configuration,
  ChatCompletionResponseMessageRoleEnum,
} = require("openai");

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const createMessage = (responseMessage) => {
    return {
      role: ChatCompletionResponseMessageRoleEnum.Assistant,
      content: responseMessage,
    };
  };

  const request = req.body;
  const chatHistory = request.chathistory;

 let response = null;
  try {
    // Use your OpenAI API key here
    // You can get your key from https://beta.openai.com/account/api-keys
    // You should set the key as an environment variable OPENAI_API_KEY
    const configuration = new Configuration({
        apiKey: "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      });
      const openai = new OpenAIApi(configuration);
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: chatHistory,
      });
      const responseMessage = completion.data.choices[0].message.content; 
     response = createMessage(responseMessage);
  } catch (error) {
    context.res = {
        status: 500,
        body: error.message,
    };
    return context.res;
  }

  chatHistory.push(response);

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: chatHistory,
  };

  return context.res;
};
