import { StrictMode } from "react";
import App from "@/App";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@/components/Theme/theme-provider";
import "./index.css";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
