import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <ul className="nav">
            <li className="nav-item">
                <NavLink to="/" className="nav-link" activeClassName="active">
                    Main
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                    to="/login"
                    className="nav-link"
                    activeClassName="active"
                >
                    Login
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                    to="/users"
                    className="nav-link"
                    activeClassName="active"
                >
                    Users
                </NavLink>
            </li>
        </ul>
    );
};

export default NavBar;
