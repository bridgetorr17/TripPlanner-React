import {  Route, 
          createBrowserRouter, 
          createRoutesFromElements, 
          RouterProvider } from 'react-router-dom'
import LandingPage from "./pages/LandingPage";

const App = () => {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/'>
                <Route index element={<LandingPage />} />
            </Route>
        )
    )

    return <RouterProvider router={router}/>
}

export default App;