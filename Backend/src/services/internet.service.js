import { tavily } from "@tavily/core";

const tvly = tavily({ apiKey: process.env.TAVILY_API_Key });
const response = await tvly.search("Who is Leo Messi?");

console.log(response);

export const searchInternet = async (query) => {
  const result = await tvly.search(query, {
    maxResults: 5,
    searchDepth: "advanced",
  });

  console.log("searchInternet from internet.service.js file:", result);
  return result;
};
