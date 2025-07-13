import {  Route, 
          createBrowserRouter, 
          createRoutesFromElements, 
          RouterProvider } from 'react-router-dom'
import LandingPage from "./pages/LandingPage";
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { useNavigate } from "react-router-dom";
import PageWrapper from './components/PageWrapper';

const App = () => {
    //Login POST 
    const loginAttempt = async (loginInfo) => {
    
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        });

        const result = await res.json();
        return result;
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<PageWrapper />}>
                <Route index element={<LandingPage />} />
                <Route path='/login' element={<LoginPage loginAttempt={loginAttempt}/>} />
                <Route path='/dashboard' element={<DashboardPage/>} />
            </Route>
        )
    )

    return <RouterProvider router={router}/>
}

export default App;