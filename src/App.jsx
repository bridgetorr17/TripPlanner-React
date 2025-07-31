import {  Route, 
          createBrowserRouter, 
          createRoutesFromElements, 
          RouterProvider } from 'react-router-dom'
import LandingPage from "./pages/LandingPage";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import UserPage from './pages/UserPage';
import PreviewPage from './pages/PreviewPage';
import CreateTripPage from './pages/CreateTripPage';
import TripPage from './pages/TripPage';
import EditTripPage from './pages/EditTripPage';
import PageWrapper from './components/PageWrapper';
import { dashboardLoader } from './pages/DashboardPage';
import { userLoader } from './pages/UserPage';
import { tripLoader } from './pages/TripPage';

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

    //Signup POST
    const signupAttempt = async (singupInfo) => {

        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(singupInfo)
        });

        const result = await res.json();
        return result;
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<PageWrapper />}>
                <Route index element={<LandingPage />} />
                <Route path='/login' element={<LoginPage loginAttempt={loginAttempt}/>} />
                <Route path='/signup' element={<SignupPage signupAttempt={signupAttempt} />} />
                <Route path='/preview' element={<PreviewPage/>}/>
                <Route path='/dashboard' element={<DashboardPage/>} loader={dashboardLoader}/>
                <Route path='/dashboard/:userName' element={<UserPage/>} loader={userLoader}/>
                <Route path='/trips/createNew' element={<CreateTripPage />}/>
                <Route path='/trips/:id' element={<TripPage owner={true} />} loader={tripLoader}/>
                <Route path='/trips/sharedTrip/:id' element={<TripPage owner={false}/>} loader={tripLoader}/>
                <Route path='/trips/edit/:id' element={<EditTripPage />} loader={tripLoader}/>
                <Route path='/logout' element={<LandingPage/>} />
            </Route>
        )
    )

    return <RouterProvider router={router}/>
}

export default App;