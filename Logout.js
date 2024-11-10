import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Logout({ showAlert, handleLogout }) {
    const history = useHistory();

    const logout = () => {
        handleLogout(); // Call the logout handler passed from App.js
        history.push('/'); // Redirect to the home page or any page after logging out
    };

    return (
        <div className="container">
            <h2>Are you sure you want to log out?</h2>
            <button onClick={logout} className="btn btn-danger">Log Out</button>
        </div>
    );
}
