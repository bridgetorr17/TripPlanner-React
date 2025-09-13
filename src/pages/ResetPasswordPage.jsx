import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const ResetPasswordPage = () => {

    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const id = searchParams.get('id')

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword, setConfrimPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submitForm = async (e) => {
        e.preventDefault();

        console.log('requesting a reset password')
        
    }

    return (
        <div className="min-h-screen bg-blue-400 flex items-center justify-center px-4 sm:px-6 md:px-8">
            <div className="bg-white max-w-md w-full p-8 rounded-lg shadow-xl border border-cyan-200">
                <h2 className="text-2xl font-semibold text-blue-700 text-center mb-6">Reset Password</h2>
                <form onSubmit={submitForm} className="flex flex-col gap-4">
                    <input 
                        type="email"
                        name="email" 
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-2 border-2 border-sky-300 rounded-md focus:outline-none focus:border-blue-400 transition"
                    />
                    <div className="flex flex-row justify-between items-center px-4 py-2 border-2 border-sky-300 rounded-md focus:outline-none focus:border-blue-400 transition">
                        <input 
                            type={showPassword ? "text" : "password"}
                            name="password" 
                            placeholder="New password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            className="focus:outline-none focus:ring-0"
                            disabled={loading}
                        />
                        <button
                            type="button"
                            onClick={(e) => setShowPassword(prev => !prev)}
                            className=" text-blue-500 hover:text-blue-700"
                            tabIndex={-1}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <input 
                        type="password"
                        name="confirmPassword" 
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfrimPassword(e.target.value)} 
                        className="px-4 py-2 border-2 border-sky-300 rounded-md focus:outline-none focus:border-blue-400 transition"
                    />
                    <button type="submit"
                            className={`mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition
                                        ${loading
                                            ? "bg-blue-400 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-700 text-white"
                                        }`}>
                        Reset Password
                    </button>
                </form>
            </div>
        </div>

    )
}

export default ResetPasswordPage;