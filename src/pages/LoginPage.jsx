import { useEffect, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import Spinner from "../components/Utlities/Spinner";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Modal from "../components/Utlities/Modal"

const LoginPage = ({loginAttempt}) => {
    const navigate = useNavigate();

    let isAlreadyLoggedIn = false;
    isAlreadyLoggedIn = useLoaderData();

    useEffect(() => {
        if (isAlreadyLoggedIn) {
            navigate('/dashboard')
        }
    }, [isAlreadyLoggedIn])

    const [email, setEmail] = useState('');
    const [emailReset, setEmailReset] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

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

    const sendEmail = async (e) => {
        e.preventDefault();
        console.log('sending request to backend for ' + emailReset)
        try{
            const res = await fetch ('/api/resetPasswordEmail', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: emailReset})
            })

            const response = await res.json();

            setEmailSent(true);
        }
        catch(err){
            console.error(err);
        }

    }

    const closeModal = () => {
        setModalOpen(false);
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
                        className="text-sm text-stone-500 mt-2" 
                        type="button"
                        onClick={() => setModalOpen(true)}>
                        Forgot Password?
                    </button>
                    <button
                        type="submit"
                        className={`mt-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition
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
            { modalOpen && (<Modal
                isOpen={true}
                onClose={closeModal}
                title="Reset Password">
                    { emailSent ? (
                        <div className="p-4">
                            <p> Thank you! If that email address is registered, you’ll receive a reset link shortly. 
                                <br />
                                <br />
                                Make sure to check you spam folder if you don't see the email in your inbox.
                            </p>
                            <button
                                onClick={closeModal}
                                className="mt-4 py-2 w-full block bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition text-center"
                            >
                                Close
                            </button>
                        </div>
                    )
                    : (
                        <form onSubmit={sendEmail} className="p-4">
                            <div className="mb-4">
                                <label htmlFor="resetEmail" className="block mb-1 font-semibold">
                                    Email Address
                                </label>
                                <input 
                                    type="email"
                                    id="resetEmail"
                                    value={emailReset}
                                    onChange={(e) => setEmailReset(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required />
                                <button
                                    type="submit"
                                    className="mt-4 py-2 w-full block bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition text-center">
                                        Send Reset Email
                                </button>
                            </div>
                        </form>
                        )}
                </Modal>)}
        </div>
    )
}


const loginLoader = async () => {
    const login = await fetch(`/api/login`)
    const loginRes = await login.json();

    return loginRes.success;
}

export {
    LoginPage as default, 
    loginLoader
}