import { Link } from "react-router-dom"

const NavLinks = () => {
    return (
        <>
            <Link to={'/dashboard'}>Dashboard</Link>
            <Link to={'/trips/createNew'}>Start a new trip</Link>
            <Link to={'/logout'}>Logout</Link>
        </>
    )
}

export default NavLinks