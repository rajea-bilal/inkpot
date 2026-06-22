import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
  tool,
  createAgent,
} from "langchain";
import { ChatMistralAI } from "@langchain/mistralai";
import { searchInternet } from "./internet.service.js";
import * as z from "zod";

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

// function to connect AI model with the tool
// passing 3 things to tool
// searchInternet function (so LangChain knows what to actually call)
// a name - so model can refer to it
// description - so model knows when to use it.
// schema specifies what shape of input to pass through (string)
const searchInternetTool = tool(searchInternet, {
  name: "search_internet",
  description:
    "use this tool to search the internet and get latest information from the web.",
  schema: z.object({
    query: z.string().describe("the search query to look up on the web"),
  }),
});

// give it a question and the agent decides whether it can
// answer directly or needs to call a tool (like searchInternetTool)
// takes the respond from calling the tool and uses it to answer user query
const agent = createAgent({
  model: mistralModel,
  tools: [searchInternetTool],
});

// function accepts the messages array (contains user messages + ai messages)
// apply a map function on the messages array,
// give appropriate langChain labels based on message content
// translating the raw messages into LangChain format by giving appropriate labels

// app stores chat history as plain objects: { role: "user", content: "..." }. 
// The agent doesn't speak that format — 
// it wants typed LangChain objects (HumanMessage, AIMessage). 
// So .map() walks your stored history and converts each one into the right type.
//  That's all it does. It runs once, produces the starting message list, and hands it to agent.invoke. 
// The tool loop hasn't begun yet.

export async function generateResponse(messages) {
  console.log(messages);
  const response = await agent.invoke({
    messages: messages.map((message) => {
      if (message.role === "user") {
        return new HumanMessage(message.content);
      } else if (message.role === "ai") {
        return new AIMessage(message.content);
      }
    }),
  });

  //grabs the final message from the agent's output,
  // since the agent may produce several intermediate messages
  // during its loop before landing on an answer

  return response.messages[response.messages.length - 1].text;
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

  return response.text.replace(/"/g, "")
}
