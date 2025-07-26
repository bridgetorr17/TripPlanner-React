import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const LoginPage = ({loginAttempt}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
            nav = nav = result.success ? '/dashboard' : '/login';
        }
        catch(err){
            console.error(err);
            if(!result.success) toast.error(result.message);
        }
        finally{
            setLoading(false);
            return navigate(nav);
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
                    />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-2 border-2 border-sky-300 rounded-md focus:outline-none focus:border-blue-400 transition"
                        disabled={loading}
                    />
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
            </div>
        </div>
    )
}

export default LoginPage;