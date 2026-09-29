import { NavLink } from "react-router-dom";
import {useAuth} from "../store/auth";
import "./Navbar.css";
export const Navbar=()=>{
    const {isLoggedIn,logout}=useAuth();
    return(
        <>
        <div className="navbar">
            <div className="navbar-logo">
                <NavLink to="/">✈️ AI Travel Planner</NavLink>
            </div>
            <div className="navbar-links">
                <NavLink to="/">Home</NavLink>
                    {isLoggedIn && (
                        <>
                        <NavLink to="/create-trip">Create Trip</NavLink>
                        <NavLink to="/my-trips">My Trips</NavLink>
                        </>
                    )}
                    {!isLoggedIn && (
                        <>
                        <NavLink to="/register">Register</NavLink>
                        <NavLink to="/login">Login</NavLink>
                        </>
                    )}
                    {
                        isLoggedIn && (
                            <button onClick={logout}>
                                Logout
                            </button>
                        )
                    }
            </div>
        </div>
        </>
        )
        }
export default Navbar;