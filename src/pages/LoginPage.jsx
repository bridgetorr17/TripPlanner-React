import { useEffect, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = ({loginAttempt}) => {
    const navigate = useNavigate();

    let isAlreadyLoggedIn = false;
    isAlreadyLoggedIn = useLoaderData();

    useEffect(() => {
        if (isAlreadyLoggedIn) {
            console.log('this user is already logged in');
            navigate('/dashboard')
        }
    }, [isAlreadyLoggedIn])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        const loginAttemptInfo = {
            email,
            password
        }

        let nav = '';

        try{
            const result = await loginAttempt(loginAttemptInfo);
            nav = result.success ? '/dashboard' : '/login';

            if (!result.success) throw new Error(result.message || 'Login failed')
        }
        catch(err){
            console.error(err);
            setLoginError(err.message);
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
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-2 border-2 border-sky-300 rounded-md focus:outline-none focus:border-blue-400 transition"
                        disabled={loading}
                        required
                    />
                    <div className="flex flex-row justify-between items-center px-4 py-2 border-2 border-sky-300 rounded-md focus:outline-none focus:border-blue-400 transition">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="focus:outline-none focus:ring-0"
                            disabled={loading}
                            required
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
                    {loginError && (
                        <div className="text-center">
                            <p className="text-red-600 font-semibold">{loginError}</p>
                        </div>
                    )}
                    <button
                        type="submit"
                        className={`mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition
                                    ${loading 
                                        ? "bg-blue-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 text-white"
                                    }`}
                        disabled={loading}
                    >
                        {loading 
                            ? <Spinner loading={loading} />
                            : "Login"}
                    </button>
                </form>
                <Link
                    to='/signup'
                    className="mt-4 py-2 w-full block bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition text-center">
                    Signup
                </Link>
            </div>
        </div>
    )
}


const loginLoader = async () => {
    const login = await fetch(`/api/login`)
    const loginRes = await login.json();

    console.log(`login success was ${loginRes.success}`)
    return loginRes.success;
}

export {
    LoginPage as default, 
    loginLoader
}