import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupPage = ({signupAttempt}) => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfrimPassword] = useState('');
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();

        const signupAttemptInfo = {
            userName,
            email,
            password,
            confirmPassword
        }

        const result = await signupAttempt(signupAttemptInfo);

        console.log(`result from the signup attempt is: ${result.succes}`);
        const nav = result.success ? '/dashboard' : '/signup';
        
        if(!result.success) toast.error(result.message);

        return navigate(nav);
    }

    return (
        <>
            <form onSubmit={submitForm}>
                <input 
                    type="text"
                    name="userName" 
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)} />
                <input 
                    type="email"
                    name="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input 
                    type="password"
                    name="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <input 
                    type="password"
                    name="confirmPassword" 
                    placeholder="Password"
                    value={confirmPassword}
                    onChange={(e) => setConfrimPassword(e.target.value)} />
                <button type="submit">Signup</button>
            </form>
        </>
    )
}

export default SignupPage;