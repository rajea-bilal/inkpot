import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage, AIMessage } from "langchain";
import { ChatMistralAI } from "@langchain/mistralai";

// AI processing layer -
// setup the model + function to pass on user's query to AI and return response
const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-large-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function testAI() {
  model
    .invoke(
      "Why do we use langchain, explain in super simple plain way. Can we create RAG apps using langchain?",
    )
    .then((response) => console.log(response.content));
}

// function accepts the messages array (contains user messages + ai messages)
// apply a map function on the messages array,
// give appropriate langChain labels based on message content
// translating the raw messages into LangChain format by giving appropriate labels
// and then retuning a new array (with the langchain approved format) to the LLM model all at once
// model reads the entire chat before deciding what to generate next
// this way it has context to the previous convo and generate more acc. responses
// save the result inside response and return the text
export async function generateResponse(messages) {
  const response = await geminiModel.invoke(
    messages.map((message) => {
      if (message.role === "user") {
        return new HumanMessage(message.content);
      } else {
        return new AIMessage(message.content);
      }
    }),
  );

  return response.text;
}

export async function generateChatTitle(message) {
  const response = await mistralModel.invoke([
    new SystemMessage(`
      'Youre a helpful assistant that generates titles from chat conversations.

      Use the message to generate a descriptive, engaging and relevant chat title that should be between 2-4 words.
      The chat title should give users a quick understanding of the contents of the chat.
      `),

    new HumanMessage(`
      Generate a descriptive chat title from the chat conversation below.

      ${message}
      `),
  ]);

  return response.text;
}
