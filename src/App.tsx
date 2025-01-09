import LoginPage from "@/app/login/page";
import DashboardPage from "@/app/dashboard/page";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';

function App() {
    console.log("Application Started")
    return (
        <Router basename="/">
            <Routes>
                <Route path="/" element={
                    <Navigate to="/dashboard" replace/>
                }/>
                <Route path="/dashboard" element={<DashboardPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>

            </Routes>
        </Router>
    )
}

export default App;