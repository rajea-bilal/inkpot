SocketIO Setup:

- Backend
  initSocket() initialises socketIO server on the backend,
  I call this function inside server.js

- Frontend
  In React frontend, in order to connect frontend -> socketIO server, use a package (socketio-client), to connect client -> server whilst using socketIO

  src/features/chat/service/chat.service.js
  Created an initialiseSocketConnection(), which connects the client (React app) to server with the help of socketIO

  When that connection takes place between client -> server, log a message to the frontend: 'Connected to socketIO'
