import { Link } from "react-router-dom"

const NavLinks = () => {
    return (
        <div className="flex flex-row">            
            <Link to={'/dashboard'} className="text-teal-600 hover:text-teal-800 p-3">Dashboard</Link>
            <Link to={'/trips/createNew'} className="text-teal-600 hover:text-teal-800 p-3">Start a new trip</Link>
            <Link to={'/logout'} className="text-teal-600 hover:text-teal-800 p-3">Logout</Link>
        </div>

    )
}

export default NavLinks