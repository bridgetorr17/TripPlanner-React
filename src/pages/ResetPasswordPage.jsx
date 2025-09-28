import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { inputStyles, panelButtonStyles } from "../components/Utilities/commonStyles.js";
import SubmitButton from "../components/StyledComponents/SubmitButton.jsx";
import StyledPanel from "../components/StyledComponents/StyledPanel.jsx"

const ResetPasswordPage = () => {

    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const userId = searchParams.get('id');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword, setConfrimPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [statusColor, setStatusColor] = useState('');

    const submitForm = async (e) => {
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

            console.log(result)
            
            if (!result.success) {
                setStatus(result.message[0].msg)
                setStatusColor('red')
            }
            else {
                setStatus(result.message);
                setStatusColor('gray')
            }
        }
        catch(err){
            console.error(err);
        }
    }

    return (
        <StyledPanel>
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
                    showSpinner={false}
                    message="Reset password"
                />
            </form>
            <Link
                to='/login'
                className={panelButtonStyles}>
                Login
            </Link>
        </StyledPanel>

    )
}

export default ResetPasswordPage;