Redux Flow:

- UI calls hooks
- hooks call API services
- hooks dispatch Redux actions
- Redux slice updates state
- UI reads Redux with useSelector

Look at handleSendChatMessage in useChat — it handles both cases. The key is this condition:

if (!chatId) dispatch(createNewChat(...))

When chatId is null — no conversation exists yet:

1. Send the message to the server
2. Server creates a new conversation and returns it with a fresh \_id
3. createNewChat adds a slot for it in Redux with an empty messages array
4. Then addNewMessageToChat pushes the user message in
5. Then addNewMessageToChat pushes the AI response in
6. Then setCurrentChatId marks it as the open conversation

When chatId exists — conversation already open:

1. Send the message to the server (passing the chatId so it knows which conversation)
2. Server adds to the existing conversation, returns the AI response
3. Skip createNewChat — the slot already exists in Redux
4. addNewMessageToChat pushes the user message in
5. addNewMessageToChat pushes the AI response in

So the slice side is simple — createNewChat just makes the empty slot, addNewMessageToChat fills it. The hook decides
which of those to call based on whether a chatId exists.

The chat?.\_id || chatId you see throughout is just: use the id the server just gave us for a new chat, or fall back to
the id we already had for an existing one.

SocketIO Setup:

- Backend
  initSocket() initialises socketIO server on the backend,
  I call this function inside server.js

- Frontend
  In React frontend, in order to connect frontend -> socketIO server, use a package (socketio-client), to connect client -> server whilst using socketIO

  src/features/chat/service/chat.service.js
  Created an initialiseSocketConnection(), which connects the client (React app) to server with the help of socketIO

  When that connection takes place between client -> server, log a message to the frontend: 'Connected to socketIO'

- HTTP — you ask, server answers, connection closes. You have to ask again to get anything new.
  - Socket.IO — connection stays open. Server can push data to you at any time without you asking.

In a chat context that means: when the AI finishes generating a response, the server pushes it to the browser instantly
rather than waiting for the frontend to poll. It also enables streaming — sending the response word by word as it's
generated, rather than waiting for the whole thing.
