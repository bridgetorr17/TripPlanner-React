import { Link } from "react-router-dom";

const LandingPage = () => {
    console.log('here is the landing page')
    return (
        <>  
            <h1>Welcome to your Trip Planner and Reminiscer</h1>
            <a href="/login">Login</a>
            <a href="/signup">Signup</a>
            <a href="/dashboard/">ViewTrips</a>
        </>
    )
}

export default LandingPage;