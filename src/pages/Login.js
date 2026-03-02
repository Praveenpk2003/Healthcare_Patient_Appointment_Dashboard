import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatient } from '../context/PatientContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = usePatient();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Email and Password are required');
            return;
        }
        if (email === 'patient@test.com' && password === '123') {
            login({ name: 'Praveen' , email: 'patient@test.com' });
            navigate('/dashboard');
        } else {
            setError('Invalid credentials. Use patient@test.com / 123');
        }
    };

    return (
        <div className="login-container animate-fade-in">
            <div className="glass-card login-card">
                <h2 className="login-title">Welcome Back</h2>
                <p className="login-subtitle">Sign in to your patient dashboard</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="login-label">Email Address</label>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="patient@test.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label className="login-label">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="• • • • • •"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="login-error">{error}</p>}

                    <button type="submit" className="btn btn-primary login-button">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
