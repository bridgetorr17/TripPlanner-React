import { useEffect, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import StyledH2 from "../components/StyledComponents/StyledH2.jsx"
import ResetPasswordModal from "../components/Login/ResetPasswordModal.jsx"
import { inputStyles, panelBorderStyles, panelButtonStyles, panelContainerStyles, passwordInputStyles } from "../components/Utilities/commonStyles.js";
import SubmitButton from "../components/StyledComponents/SubmitButton.jsx"

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
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

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

    const closeModal = () => {
        setModalOpen(false);
    }
    
    return (
        <div className={panelContainerStyles}>
            <div className={panelBorderStyles}>
                <StyledH2 color={"blue"}>
                    Triply
                </StyledH2>
                <form onSubmit={submitForm} className="flex flex-col gap-4">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputStyles}
                        disabled={loading}
                        required
                    />
                    <div className={passwordInputStyles}>
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
                    <SubmitButton
                        loading={loading}
                        color="blue"
                        children="Login"
                    />
                </form>
                <Link
                    to='/signup'
                    className={panelButtonStyles}>
                    Signup
                </Link>
            </div>
            { modalOpen && (<ResetPasswordModal
                closeModal={closeModal}
            />)}
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