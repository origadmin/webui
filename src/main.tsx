import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@/components/Theme/theme-provider";
import MainApp from "@/app/MainApp";
import "./main.css";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement!).render(
  <StrictMode>
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  </StrictMode>,
);
