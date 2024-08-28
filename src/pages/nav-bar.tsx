import { NavLink, Outlet } from "react-router-dom"

export const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/Dashboard">Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to="/Profile">Profile</NavLink>
                </li>
            </ul>
            <div><Outlet/></div>
        </nav>
    )
}