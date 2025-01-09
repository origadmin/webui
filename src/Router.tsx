import {createBrowserRouter} from 'react-router-dom'
import LoginPage from "@/app/login/page";
import DashboardPage from "@/app/dashboard/page";

const router = createBrowserRouter([
    // Auth routes
    {
        path: '/',
        lazy: async () => ({
            Component: DashboardPage,
        }),
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