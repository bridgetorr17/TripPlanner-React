import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { inputStyles, panelBorderStyles, panelButtonStyles, panelContainerStyles, passwordInputStyles } from "../Utilities/commonStyles.js";
import SubmitButton from "../components/StyledComponents/SubmitButton.jsx";
import StyledH2 from "../components/StyledComponents/StyledH2.jsx"

const ResetPasswordPage = () => {

    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const userId = searchParams.get('id');

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [confirmPassword, setConfrimPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<string>('');
    const [statusColor, setStatusColor] = useState<string>('');

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const resetPasswordDetails = {
            token, 
            userId,
            email,
            password,
            confirmPassword
        }

        try{
            console.log('requesting reset password, here is the token ' + token)
            
            const res = await fetch(`/api/resetPassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resetPasswordDetails)
            });

            const result = await res.json();
            setStatus(result.message);
            
            if (!result.success) setStatusColor('red')
            else setStatusColor('gray')
        }
        catch(err){
            console.error(err);
        }
    }

    return (
        <div className={panelContainerStyles}>
            <div className={panelBorderStyles}>
            <StyledH2 color="blue">
                Reset Password
            </StyledH2>
            <form onSubmit={submitForm} className="flex flex-col gap-4">
                <input 
                    type="email"
                    name="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputStyles}
                />
                <div className={passwordInputStyles}>
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
                    className={inputStyles}
                />
                {status && (
                    <div className="text-center">
                        <p className={`text-${statusColor}-600 font-semibold`}>{status}</p>
                    </div>
                )}
                <SubmitButton
                    loading={loading}
                    color="blue"
                    children="Reset password"
                />
            </form>
            <Link
                to='/login'
                className={panelButtonStyles}>
                Login
            </Link>
        </div>
        </div>
    )
}

export default ResetPasswordPage;