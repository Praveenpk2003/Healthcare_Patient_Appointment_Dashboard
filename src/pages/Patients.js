import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await api.get('/users');
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPatients();
    }, []);

    return (
        <div className="animate-fade-in">
            <header className="patients-header">
                <h1 className="patients-title">All Patients</h1>
                <p className="patients-subtitle">Directory of clinical patient records</p>
            </header>

            <div className="patients-grid">
                {loading ? (
                    <p>Loading records...</p>
                ) : (
                    patients.map((patient) => (
                        <div key={patient.id} className="glass-card patient-card">
                            <div className="patient-avatar">
                                {patient.name.charAt(0)}
                            </div>
                            <h3 className="patient-name">{patient.name}</h3>
                            <p className="patient-email">{patient.email}</p>
                            <button
                                onClick={() => navigate(`/patient-details/${patient.id}`)}
                                className="btn btn-primary view-btn"
                            >
                                {/* <Link to={`/patient-details/${patient.id}`} 
                                className="btn btn-primary">
    View Profile   
</Link> */}

                                View Profile
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Patients;
