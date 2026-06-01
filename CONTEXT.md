# Inkpot

An AI-powered workspace where users hold multi-turn conversations with an LLM, with full history persisted across sessions.

## Language

**Conversation**:
A saved, multi-turn exchange between a user and the AI, persisted in the database with a generated title.
_Avoid_: Chat, thread, document

**Message**:
A single turn within a Conversation — either from the user or the AI.
_Avoid_: Prompt, response (use these only when describing the role, not the entity itself)

**Workspace**:
The main screen a returning user lands on — shows their 5 most recent Conversations with titles and last-active dates, and surfaces a single action to start a new Conversation.
_Avoid_: Dashboard, home, feed
