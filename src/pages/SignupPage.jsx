import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SubmitButton from "../components/StyledComponents/SubmitButton.jsx"
import { inputStyles, panelBorderStyles, panelContainerStyles, passwordInputStyles } from "../components/Utilities/commonStyles.js";
import StyledH2 from "../components/StyledComponents/StyledH2.jsx"

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
                <div className="text-center">
                    {signupError.map(err => <p className="text-red-600 font-semibold">{err.msg}</p>)}      
                </div>
                <SubmitButton 
                    loading={loading}
                    message="Sign up"
                    color="blue"
                />
            </form>
        </div>
    </div>

    )
}

export default SignupPage;