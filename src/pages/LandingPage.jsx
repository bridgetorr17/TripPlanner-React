import { Link } from "react-router-dom";

const LandingPage = () => {
    console.log('here is the landing page')
    return (
        <>  
            <h1>Welcome to your Trip Planner and Reminiscer</h1>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/dashboard/">ViewTrips</Link>
        </>
    )
}

export default LandingPage;