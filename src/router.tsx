import {createBrowserRouter, Navigate} from 'react-router-dom'
import LoginPage from "@/app/login/page";
import DashboardPage from "@/app/dashboard/page";

const router = createBrowserRouter([
    // Auth routes
    {
        path: '/',
        element: <Navigate to="/dashborad" replace/>
    },
    {
        path: '/dashboard',
        lazy: async () => ({
            Component: DashboardPage,
        }),
    },
    {
        path: '/login',
        lazy: async () => ({
            Component: LoginPage,
        }),
    },
])

export default router