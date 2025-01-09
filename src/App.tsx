import { Navigate, Route, BrowserRouter as Router, RouterProvider, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import DashboardPage from '@/app/dashboard/page';
import LoginPage from '@/app/login/page';

function App() {
  console.log('Application Started');
  return (
    <>
      {/*<RouterProvider router={router}/>*/}
      {/*<Toaster/>*/}
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
