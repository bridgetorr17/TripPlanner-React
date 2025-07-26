import { Link } from "react-router-dom";
import bg from '../photos/landingPageBackground.jpg'

const LandingPage = () => {
    return (
        <div className="flex flex-col justify-center items-center"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh'
                }}>
            <h1 className="text-7xl p-2 text-gray-50">TRIPLY</h1>
            <span className="text-4xl p-2 text-gray-50">Hold on to the memories, they will hold on to you.</span>
            <Link to="/login" className="bg-blue-500 text-gray-50 font-medium rounded-full px-6 py-3 shadow-md transition transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-300 p-2 m-2">Login</Link>
            <Link to="/signup" className="bg-blue-500 text-gray-50 font-medium rounded-full px-6 py-3 shadow-md transition transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-300 p-2 m-2">Signup</Link>
            <Link to="/dashboard/" className="bg-blue-500 text-gray-50 font-medium rounded-full px-6 py-3 shadow-md transition transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-300 p-2 m-2">See your trips</Link>
        </div> 
    )
}

export default LandingPage;