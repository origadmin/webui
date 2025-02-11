import { StrictMode } from "react";
import { queryClient } from "@/router";
import { QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@/components/Theme/theme-provider";
import MainApp from "@/app/MainApp";
import "./main.css";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MainApp />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
