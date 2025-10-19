import React from 'react';
import { Link } from 'react-router-dom'; // For navigation
import { GrAction } from "react-icons/gr";

const ErrorPage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                {/* <img 
                    src={GrAction} 
                    alt="Error" 
                    className="w-40 mx-auto mb-6"
                /> */}
                <GrAction size={80} className="mx-auto mb-6 text-red-500" />
                <h1 className="text-4xl text-red-500 font-semibold mb-4">Oops! Triply is tripping</h1>
                <p className="text-gray-700 text-lg mb-6">
                    It seems like we've tripped up. Don't worry, we'll fix it soon! In the meantime, you can go back to the dasboard.
                </p>
                <Link 
                    to="/dashboard" 
                    className="inline-block bg-red-500 text-white py-2 px-6 rounded-md text-lg hover:bg-red-600 transition-colors"
                >
                    Go Back to Dashboard
                </Link>
            </div>
        </div>
    );
}

export default ErrorPage;