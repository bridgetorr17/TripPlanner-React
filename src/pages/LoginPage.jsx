import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = ({loginAttempt}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();

        const loginAttemptInfo = {
            email,
            password
        }

        const result = await loginAttempt(loginAttemptInfo);

        const nav = result.success ? '/dashboard' : '/login';
        
        if(!result.success) toast.error(result.message);

        return navigate(nav);
    }

    return (
        <>
            <form onSubmit={submitForm}>
                <input 
                    id="email"
                    name="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input 
                    id="password"
                    name="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LoginPage;