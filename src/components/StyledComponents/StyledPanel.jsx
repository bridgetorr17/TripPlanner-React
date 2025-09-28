import ResetPasswordModal from "../Login/ResetPasswordModal.jsx"

const StyledPanel = ({modalOpen, closeModal, children}) => {

    return (
        <div className="min-h-screen bg-blue-400 flex items-center justify-center px-4 sm:px-6 md:px-8">
            <div className="bg-white max-w-md w-full p-8 rounded-lg shadow-xl border border-cyan-200">
                {children}
            </div>
            { modalOpen && (<ResetPasswordModal
                closeModal={closeModal}
            />)}
        </div>
    )
}

export { StyledPanel as default }