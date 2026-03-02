import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const PatientDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const response = await api.get(`/users/${id}`);
                setPatient(response.data);
            } catch (error) {
                console.error('Error fetching patient details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPatientDetails();
    }, [id]);

    if (loading) return <div className="container">Loading profile...</div>;
    if (!patient) return <div className="container">Patient not found.</div>;

    return (
        <div className="animate-fade-in">
            <button onClick={() => navigate('/dashboard')} className="btn back-btn">
                ← Back to Dashboard
            </button>

            <div className="glass-card profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">{patient.name.charAt(0)}</div>
                    <div>
                        <h1 className="profile-name">{patient.name}</h1>
                        <p className="profile-status">Patient ID: #APT-{patient.id}</p>
                    </div>
                </div>

                <div className="details-grid">
                    <div className="detail-item">
                        <label className="detail-label">Email Address</label>
                        <p className="detail-value">{patient.email}</p>
                    </div>
                    <div className="detail-item">
                        <label className="detail-label">Phone Number</label>
                        <p className="detail-value">{patient.phone}</p>
                    </div>
                    <div className="detail-item-full">
                        <label className="detail-label">Address</label>
                        <p className="detail-value">
                            {patient.address?.suite}, {patient.address?.street}<br />
                            {patient.address?.city}, {patient.address?.zipcode}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDetails;
