import { Link } from "react-router-dom";
import VaraText from "../components/VaraText";

const LandingPage = () => {
    const linkStyles = 
        "bg-blue-500 text-gray-50 font-medium rounded-full px-6 py-3 shadow-md transition transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-300"
    return (
        <div className="flex flex-col justify-center items-center bg-blue-300 min-h-screen px-4 text-center">
            <div className="vara-wrapper flex justify-center items-center w-full"
                style={{
                    width: '100%',
                }}>
                <VaraText 
                    text="Triply"
                    fontURL="https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Pacifico/PacificoSLO.json"
                    options={{
                        fontSize: window.innerWidth < 640 ? 36 : 60, 
                        strokeWidth: 1, 
                        color: '#f0f0f0' }}
                    />
            </div>
            <span className="text-xl sm:text-2xl md:text-4xl p-4 text-gray-50 font-light leading-snug">
                Record, Remember, Reminisce
                </span>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link to="/login" className={linkStyles}>
                    Login
                </Link>
                <Link to="/signup" className={linkStyles}>
                    Signup
                </Link>
                <span className={linkStyles}>
                    <a href="https://triplytravel.vercel.app/trips/viewer/68bafcb827c19de38c521114">
                        Explore
                    </a>
                </span>
            </div>
        </div> 
    )
}

export default LandingPage;