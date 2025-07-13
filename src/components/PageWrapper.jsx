import { Outlet } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const PageWrapper = () => {
    return (
        <>
            <ToastContainer />
            <Outlet />
        </>
    )
}

export default PageWrapper;