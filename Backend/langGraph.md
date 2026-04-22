# LangGraph

LangGraph is the engine/framework that controls the flow of an AI app when that app has multiple steps. It is a **low-level orchestration framework and runtime for building long-running, stateful agents**. 

It handles features like:
- Durable execution & streaming
- Human-in-the-loop interactions
- Short-term and long-term memory

In plain English, **LangGraph helps you control your app's workflow:** What happens first? What happens next? Where is data stored? When does the process stop?

Instead of thinking *"the AI just replies once"*, LangGraph makes you think: **"this app is a flow made of steps"**.

---

## 🧩 The Core Moving Parts

To build a LangGraph workflow, you need to understand its primary building blocks:

### 1. State
**"The graph's memory for this run."**
State is the shared data the graph carries around while it runs. For example, it might hold the conversation messages, the current tool result, or user preferences. Because steps (nodes) can read and write to this state, LangGraph is considered "stateful".

### 2. StateGraph
**"The blueprint of the flow."**
You use `StateGraph` to build the workflow itself. You define a shared `State` first, add steps (`nodes`), connect them (`edges`), and then compile it. It means: *"I am building a flow of steps that can all read and update the same shared data."*

### 3. Node
**"One step that does work."**
A node is one worker or job in the flow. It takes the `State`, does some work (like calling an LLM, running a tool, or preparing data), and returns an update to the state. Nodes and edges are essentially just functions under the hood.

### 4. Edge
**"The path to the next step."**
An edge is the connection between nodes. It doesn't do work itself; it just tells the graph exactly where execution goes next. If a node is a room, an edge is the hallway to the next room.

### 5. START & END
- **START**: The entry point. It means *"this is where the workflow begins."* You connect `START` to the first actual node you want to run.
- **END**: The exit point. It means *"the workflow is finished now."* When execution reaches `END`, the whole graph stops.

#### A Tiny Real-World Flow:
1. `START` &rarr; workflow begins
2. `read_user_message` (node: reads state)
3. `call_model` (node: updates state)
4. `END` &rarr; workflow stops

---

## 🛠️ ToolNode vs createAgent

If you want your app to use tools, you have two main approaches:

### `createAgent` (Higher-Level)
**"Build me a full agent quickly."**
This is the prebuilt, LangChain way to build an agent. You supply a model, tools, and a system prompt, and it handles the standard loop internally: call the model, let it choose tools, and stop when it's done. 
*👉 Use this if you want the standard, simpler interface.*

### `ToolNode` (Lower-Level)
**"I’m building my own graph, and this specific step runs the tools."**
A `ToolNode` is a prebuilt LangGraph node whose specific job is to execute tools. When the model asks for a tool (e.g., search), `ToolNode` automatically runs it, handles parallel execution, catches errors, and passes the result back into the workflow state. 
*👉 Use this when you are building a custom LangGraph workflow and need fine-grained control.*

---

## 📌 The "TL;DR" Cheat Sheet

- **LangGraph**: The system managing a multi-step AI workflow.
- **StateGraph**: “I am building the workflow.”
- **State**: “This is the shared data moving through the workflow.”
- **Node**: “This step does work.”
- **Edge**: “Go here next.”
- **START**: “Begin here.”
- **END**: “Stop here.”
- **createAgent**: “Give me the ready-made agent.”
- **ToolNode**: “Inside my custom graph, this step runs tools.”