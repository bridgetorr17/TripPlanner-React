import { useEffect, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import StyledH2 from "../components/StyledComponents/StyledH2.jsx"
import ResetPasswordModal from "../components/Login/ResetPasswordModal.jsx"
import { inputStyles, panelBorderStyles, panelButtonStyles, panelContainerStyles, passwordInputStyles } from "../Utilities/commonStyles.js";
import SubmitButton from "../components/StyledComponents/SubmitButton.jsx"
import { LoginInfo } from "../../shared/types/Authentication.js";
import { useCreateAuth } from '../hooks/useCreateAuth.js'

const LoginPage = () => {
    const nav = useNavigate();

    let isAlreadyLoggedIn = false;
    isAlreadyLoggedIn = useLoaderData();

    //redirects to dashboard if user's session cookies are active
    useEffect(() => {
        if (isAlreadyLoggedIn) {
            nav('/dashboard')
        }
    }, [isAlreadyLoggedIn])

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const closeModal = () => {
        setModalOpen(false);
    }
    
    const {
        loading, 
        error, 
        handleSubmit
    } = useCreateAuth<LoginInfo>({
        url: '/api/login',
        attemptData: {email, password},
        rerouteTo: '/login'
    })

    return (
        <div className={panelContainerStyles}>
            <div className={panelBorderStyles}>
                <StyledH2 color={"blue"}>
                    Triply
                </StyledH2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                    {error && (
                        <div className="text-center">
                            <p className="text-red-600 font-semibold">{error}</p>
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