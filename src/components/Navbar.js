import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePatient } from '../context/PatientContext';

const Navbar = () => {
    const { user, logout } = usePatient();
    if (user) console.log("useContext: user accessed in Navbar"); 
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="nav">
            <div className="nav-container">
                <div className="logo">
                    <Link to="/dashboard" className="logo-link">CareBoard</Link>
                </div>

                <div className="links">
                    <Link to="/dashboard" className="link">Dashboard</Link>
                    <Link to="/patients" className="link">Patients</Link>
                    <Link to="/performance-test" className="link">Performance</Link>
                </div>

                <div className="user-section">
                    {user ? (
                        <>
                            <span className="welcome">Welcome Patient: <strong>{user.name}</strong></span>
                            <button onClick={handleLogout} className="btn logout-btn">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="btn btn-primary">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
