# What is LangChain?

LangChain is a popular, open-source framework designed to help developers build powerful applications powered by large language models (LLMs). If an LLM is like a "brain" that can understand and generate text, LangChain is the "nervous system" that connects this brain to the outside world, allowing it to remember things, use tools, and interact with your specific data.

Instead of writing custom code from scratch to connect a language model to a database or a web search API, LangChain provides a set of pre-built, standardized building blocks.

---

## Core Terminology: The Building Blocks

LangChain uses specific, original terminology for its components. Here are the most important ones, explained simply:

### 1. Models

These are the actual AI models doing the heavy lifting (like OpenAI's GPT-4, Anthropic's Claude, or Google's Gemini). LangChain provides a standard interface so you can easily swap one model out for another without rewriting your entire application.

### 2. Prompts & Prompt Templates

A prompt is the instruction or question you send to the model. LangChain uses **Prompt Templates** to help you format these instructions dynamically. For example, instead of writing "Translate this into French: [text]" every time, you create a template where you just drop in the `[text]` variable.

### 3. Chains

A **Chain** is simply a sequence of steps linked together. Instead of just sending one prompt and getting one answer, a chain might take user input, format it using a Prompt Template, send it to a Model, and then pass the model's output to another tool. It "chains" operations together.

### 4. Memory

By default, language models have "amnesia"—they do not remember previous questions in a conversation. LangChain provides **Memory** components that automatically store the history of a chat and pass it back to the model with every new question, allowing for natural, continuous conversations.

### 5. Document Loaders & Splitters

To build an app that knows about your private data, you first have to load that data. **Document Loaders** pull in text from PDFs, websites, Notion, or databases. **Splitters** then chop this long text into smaller, manageable chunks so the AI can process them easily.

### 6. Embeddings & Vector Stores

LangChain converts your chopped-up text into mathematical numbers called **Embeddings**. It then saves these numbers in specialized databases called **Vector Stores**. This allows the app to quickly search through millions of documents to find the exact paragraphs that are most relevant to a user's question. This entire process constraint is often referred to as Retrieval-Augmented Generation (RAG).

### 7. Retrievers

A **Retriever** is the interface that actually fetches the relevant documents from the Vector Store. When a user asks a question, the Retriever grabs the best pieces of information and hands them to the language model to craft an answer.

### 8. Tools

**Tools** are external functions that the AI can use. Common tools include a calculator, a web search engine, a weather API, or a database querying script.

### 9. Agents

While Chains follow a strict, hard-coded sequence of steps, **Agents** use the language model to _decide_ what steps to take. You give the Agent a goal and a toolbox of **Tools**, and the Agent figures out which tools to use and in what order to solve the problem.

---

## How LangChain is Used to Build AI Apps

By snapping these building blocks together, you can build a wide variety of intelligent applications:

### 1. Chatbots with Personalities and Memory

Using **Models**, **Prompt Templates** (to define the bot's personality), and **Memory**, you can quickly create an AI assistant for customer service that remembers the context of the entire conversation.

### 2. Q&A over Private Data (RAG Apps)

You can use **Document Loaders** to read your company's internal PDFs, store them in a **Vector Store**, and use a **Retriever** to build an app where employees can ask questions like, "What is our company's policy on remote work?" and get verified answers based _only_ on your internal documents.

### 3. Automated Assistants (Agents)

You can build an **Agent** that acts as a personal research assistant. You can give it access to a web search **Tool** and a calculator **Tool**. If you ask it, "Who won the World Series in 2023, and what is their team payroll divided by the number of players?", the Agent will independently search the web, find the team, find the payroll, use the calculator, and return the final answer.

### 4. Data Extraction

You can build a **Chain** that automatically takes dirty, unstructured text (like a messy email or a call transcript) and pulls out specific data points (like names, dates, and action items), formatting them into organized tables or JSON files for your database.

## Summary

LangChain simplifies AI development by providing standard puzzle pieces (**Models, Chains, Agents, Memory, Retrievers, Tools**) that you can plug together to build intelligent apps quickly, connecting raw AI power to your own specific data and external systems.

s

## AI service provider

1. Training LLMs (can burn millions of dollars)
2. Hosting an LLM
3. Providing APIs to access the LLM

AI Service Providers(ASP ) OpenAI, Google, Microspft, Mistral, Cohere

Each message is stateless
Each message sent from user to server to AI and back is completely independant.
They don't keep track of previous messages.
By default, AI only processes each query
They accept some input and spit out some output
They have no idea about past messages, future messages, only concerned with the current message

We have to maintain the chat history inside the server, the multiple back and forth between client and AI

We're able to maintain context of the conversation in the server
We cerated an array on the server
Convert it to HumanMessages, and push it inside the messages array

Server is now not sending individual messages to the server, but sending the entire array of messages to the AI model.

```bash
const messages = []
```
