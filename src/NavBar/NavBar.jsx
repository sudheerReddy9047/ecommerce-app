import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from './../userContext';

const NavBar = () => {
    const userContext = useContext(UserContext);

    const navigate = useNavigate()
    function onLogout() {
        userContext.setuser({
            isLoggedin: false,
            info: null
        });
        navigate('/#')
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/#">eCommerce</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/dashboard">
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">
                            Login
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register">
                            Register
                        </NavLink>
                    </li>
                </ul>
                {
                    userContext.user.isLoggedin && <div style={{ marginRight: 100 }}>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/#" role="button" data-toggle="dropdown" aria-expanded="false">
                                    <span className='ml-2'>{userContext.user.info.fullName}</span>
                                </a>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href='/#' role='button' onClick={onLogout}>Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </nav>
    );
}

export default NavBar;
