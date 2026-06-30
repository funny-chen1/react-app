import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";
import App from "./App.jsx";
import "./index.css";
import store from "./store/index.js";

const theme = {
  token: {
    colorPrimary: "#7c3aed",
    colorLink: "#7c3aed",
    colorLinkHover: "#a78bfa",
    colorSuccess: "#10b981",
    colorWarning: "#fb923c",
    colorError: "#f472b6",
    borderRadius: 8,
    fontFamily:
      "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ConfigProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ConfigProvider>
  </Provider>
);
