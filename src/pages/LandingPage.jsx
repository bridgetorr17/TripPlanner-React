import { Link } from "react-router-dom";
import bg from '../photos/landingPageBackground.avif'
import VaraText from "../components/VaraText";

const LandingPage = () => {
    return (
        <div className="flex flex-col justify-center items-center"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh'
                }}>
            <div className="vara-wrapper flex justify-center items-center w-full h-ful"
                style={{
                    width: '100%',
                }}>
                <VaraText 
                    text="Triply"
                    fontURL="https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Pacifico/PacificoSLO.json"
                    options={{fontSize: 60, strokeWidth: 1, color: '#f0f0f0' }}
                    />
            </div>
            <span className="text-4xl p-2 text-gray-50">Record, Remember, Reminisce</span>
            <Link to="/login" className="bg-blue-500 text-gray-50 font-medium rounded-full px-6 py-3 shadow-md transition transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-300 p-2 m-2">Login</Link>
            <Link to="/signup" className="bg-blue-500 text-gray-50 font-medium rounded-full px-6 py-3 shadow-md transition transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-300 p-2 m-2">Signup</Link>
            <Link to="/preview" className="bg-blue-500 text-gray-50 font-medium rounded-full px-6 py-3 shadow-md transition transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-300 p-2 m-2">Explore</Link>
        </div> 
    )
}

export default LandingPage;