import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SubmitButton from "../components/StyledComponents/SubmitButton.jsx"
import { inputStyles, panelBorderStyles, panelContainerStyles, passwordInputStyles } from "../Utilities/commonStyles.js";
import StyledH2 from "../components/StyledComponents/StyledH2.jsx"
import { SignupInfo, AuthenticationResult } from '../../shared/types/Authentication.js'

type SignupPageProps = {
    signupAttempt: (info: SignupInfo) => Promise<AuthenticationResult>
}

const SignupPage = ({signupAttempt}: SignupPageProps) => {

    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [confirmPassword, setConfrimPassword] = useState<string>('');
    const [signupError, setSignupError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const signupAttemptInfo = {
            userName,
            email,
            password,
            confirmPassword
        };

        let nav = '';

        try{
            const result = await signupAttempt(signupAttemptInfo);
            nav = result.success ? '/dashboard' : '/signup';

            if (!result.success) {
                if (result.message) setSignupError(result.message);
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
    <div className={panelContainerStyles}>
        <div className={panelBorderStyles}>
            <StyledH2 color="blue">Triply</StyledH2>
            <form onSubmit={submitForm} className="flex flex-col gap-4">
                <input 
                    type="text"
                    name="userName" 
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value.toLowerCase())} 
                    className={inputStyles}
                    disabled={loading}
                />
                <input 
                    type="email"
                    name="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputStyles}
                    disabled={loading}
                />
                <div className={passwordInputStyles}>
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
                    className={inputStyles}
                    disabled={loading}
                />
                <div className="text-center font-bold text-red-500">
                    {signupError}    
                </div>
                <SubmitButton 
                    loading={loading}
                    color="blue"
                    children="Sign up"
                />
            </form>
        </div>
    </div>

    )
}

export default SignupPage;