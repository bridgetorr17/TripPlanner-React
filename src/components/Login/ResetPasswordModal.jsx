import { useState } from "react";
import StyledButton from "../StyledComponents/StyledButton";
import Modal from "../StyledComponents/Modal";
import SubmitButton from "../StyledComponents/SubmitButton";

const ResetPasswordModal = ({ closeModal }) => {
    const [emailReset, setEmailReset] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    
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

            console.log(response);

            setEmailSent(true);
        }
        catch(err){
            console.error(err);
        }
    }
    return (
        <Modal
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
                    <StyledButton
                        onClickFn={closeModal}
                        color="blue"
                    >
                        Close
                    </StyledButton>
                </div>
            )
            : (
                <form onSubmit={sendEmail} className="flex flex-col gap-4">
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
                        <SubmitButton
                            loading={false}
                            color="blue"
                            children="Send Reset Email"
                        />
                </form>
            )}
        </Modal>)
}

export { ResetPasswordModal as default }