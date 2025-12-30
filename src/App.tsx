import {  Route, 
          createBrowserRouter, 
          createRoutesFromElements, 
          RouterProvider,
          Outlet } from 'react-router-dom'
import LandingPage from "./pages/LandingPage";
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ErrorPage from './pages/ErrorPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import UserPage from './pages/UserPage';
import CreateTripWizardPage from './pages/CreateTripWizardPage';
import TripPage, { authTripLoader, viewerTripLoader } from './pages/TripPage';
import PageWrapper from './Utilities/PageWrapper';
import { dashboardLoader } from './pages/DashboardPage';
import { userLoader } from './pages/UserPage';
import { createTripLoader } from './pages/CreateTripWizardPage';
import { loginLoader } from './pages/LoginPage';
import { ErrorBoundary } from "react-error-boundary";
import { configureMarkers } from './Utilities/ConfigureMarkerStyles'

const App = () => {
    //configure styles for markers ono the map
    configureMarkers();

    const ErrorBoundaryLayout = () => {
        return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <Outlet />
        </ErrorBoundary>
    )};

    const router = createBrowserRouter(
        createRoutesFromElements(
        <Route element={<ErrorBoundaryLayout />} errorElement={<ErrorPage/>}>
            <Route path='/' element={<PageWrapper />} errorElement={<ErrorPage/>}>
                <Route index element={<LandingPage />} errorElement={<ErrorPage/>}/>
                <Route path='/login' element={<LoginPage />} loader={loginLoader} errorElement={<ErrorPage/>}/>
                <Route path='/signup' element={<SignupPage />} errorElement={<ErrorPage/>}/>
                <Route path='/resetPassword' element={<ResetPasswordPage />} errorElement={<ErrorPage/>}/>
                <Route path='/dashboard' element={<DashboardPage/>} loader={dashboardLoader} errorElement={<ErrorPage/>}/>
                <Route path='/dashboard/:id' element={<UserPage/>} loader={userLoader} errorElement={<ErrorPage/>}/>
                <Route path='/trips/createNew' element={<CreateTripWizardPage />} loader={createTripLoader} errorElement={<ErrorPage/>}/>
                <Route path='/trips/viewer/:id' element={<TripPage/>} loader={viewerTripLoader} errorElement={<ErrorPage/>}/>
                <Route path='/trips/:id' element={<TripPage/>} loader={authTripLoader} errorElement={<ErrorPage/>}/>
                <Route path='/logout' element={<LandingPage/>} errorElement={<ErrorPage/>}/>
                <Route path='/errorpage' element={<ErrorPage/>} />
            </Route>
        </Route>
        )
    )

    return <RouterProvider router={router}/>
}

export default App;