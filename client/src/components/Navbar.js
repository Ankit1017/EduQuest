import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Logout from './logout'

const Navbar = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        console.log(user);
    }, [])

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Question Paper App</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                {user ? (
                    <>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                <Link className="nav-link " aria-current="page" to="/question-paper">Question Paper</Link>
                                {user.isAdmin ? (
                                    <Link className="nav-link " aria-current="page" to="/add-question">Add Question</Link>
                                ) :
                                    (
                                        <></>
                                    )}
                                {user.isAdmin ? (
                                    <Link className="nav-link " aria-current="page" to="/admin">Admin</Link>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className="navbar_nav_2">
                                <h4>{user.username}</h4>
                                <Logout />
                            </div>
                        </div>
                    </>
                ) : (
                    <h5>Login/Register first.</h5>
                )}
            </div>
        </nav>
    );
};

export default Navbar;