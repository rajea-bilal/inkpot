import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/index.css";
import App from "./app/App.jsx";
import { store } from "./app/app.store";
import { Provider } from "react-redux"; // redux provider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
