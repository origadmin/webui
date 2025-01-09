import {ThemeProvider} from '@/components/theme-provider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./assets/index.css"
import { RouterProvider } from 'react-router-dom';
import router from "@/Router";
import {Toaster} from "@/components/ui/toaster";

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement!).render(
    <React.StrictMode>
        <ThemeProvider>
            <RouterProvider router={router} />
            {/*<Toaster />*/}
            {/*<App/>*/}
        </ThemeProvider>
    </React.StrictMode>
);
