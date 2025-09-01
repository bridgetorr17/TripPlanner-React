import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Utlities/Spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignupPage = ({signupAttempt}) => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword, setConfrimPassword] = useState('');
    const [signupError, setSignupError] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        const signupAttemptInfo = {
            userName,
            email,
            password,
            confirmPassword
        }

        let nav = '';

        try{
            const result = await signupAttempt(signupAttemptInfo);
            nav = result.success ? '/dashboard' : '/signup';

            if (!result.success) {
                setSignupError(result.message);
                throw result.message;
            }
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
            navigate(nav);
        }
    }

    return (
        <div className="min-h-screen bg-blue-400 flex items-center justify-center px-4 sm:px-6 md:px-8">
            <div className="bg-white max-w-md w-full p-8 rounded-lg shadow-xl border border-cyan-200">
                <h2 className="text-2xl font-semibold text-blue-700 text-center mb-6">Triply</h2>
                <form onSubmit={submitForm} className="flex flex-col gap-4">
                    <input 
                        type="text"
                        name="userName" 
                        placeholder="User Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value.toLowerCase())} 
                        className="px-4 py-2 border-2 border-sky-300 rounded-md focus:outline-none focus:border-blue-400 transition"
                        disabled={loading}
                    />
                    <input 
                        type="email"
                        name="email" 
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-2 border-2 border-sky-300 rounded-md focus:outline-none focus:border-blue-400 transition"
                        disabled={loading}
                    />
                    <div className="flex flex-row justify-between items-center px-4 py-2 border-2 border-sky-300 rounded-md focus:outline-none focus:border-blue-400 transition">
                        <input 
                            type={showPassword ? "text" : "password"}
                            name="password" 
                            placeholder="Password"
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
                        placeholder="Password"
                        value={confirmPassword}
                        onChange={(e) => setConfrimPassword(e.target.value)} 
                        className="px-4 py-2 border-2 border-sky-300 rounded-md focus:outline-none focus:border-blue-400 transition"
                        disabled={loading}
                    />
                    <div className="text-center">
                        {signupError.map(err => <p className="text-red-600 font-semibold">{err.msg}</p>)}      
                    </div>
                    <button type="submit"
                            className={`mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition
                                        ${loading
                                            ? "bg-blue-400 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-700 text-white"
                                        }`}
                            disabled={loading}>
                        {loading 
                            ? <Spinner loading={loading} />
                            : "Signup"}
                    </button>
                </form>
            </div>
        </div>

    )
}

export default SignupPage;