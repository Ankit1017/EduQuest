import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            navigate("/");
            logout();
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;