import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { store } from "./services/store.ts";
import { AuthContextProvider } from "./services/auth.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <Router>
          <App />
        </Router>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);
