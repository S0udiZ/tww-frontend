import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Layout from "./Layout";
import { BrowserRouter } from "react-router-dom";

// Contexts
import BlogContext from "./context/BlogContext";
import ToastContext from "./context/ToastContext";
import ThemeContext from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeContext>
      <ToastContext>
        <BlogContext>
          <BrowserRouter>
            <Layout>
              <App />
            </Layout>
          </BrowserRouter>
        </BlogContext>
      </ToastContext>
    </ThemeContext>
  </React.StrictMode>
);
