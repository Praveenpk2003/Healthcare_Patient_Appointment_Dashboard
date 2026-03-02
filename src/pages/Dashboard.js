import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { usePatient } from '../context/PatientContext';

const Dashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visiblePhoneIds, setVisiblePhoneIds] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1); 
    const itemsPerPage = 5;
    const { user } = usePatient();

    console.log("useState: loading updated (" + loading + ")");
    console.log("useState: page changed to " + currentPage); 

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await api.get('/users');
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            } finally {
                setLoading(false);
            }
        };

        console.log("useEffect: API called once"); 
        fetchAppointments();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAppointments = appointments.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(appointments.length / itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const togglePhone = (id) => {
        if (visiblePhoneIds.includes(id)) {
            setVisiblePhoneIds(visiblePhoneIds.filter(item => item !== id));
        } else {
            setVisiblePhoneIds([...visiblePhoneIds, id]);
        }
    };

    return (
        <div className="animate-fade-in">
            <header className="dashboard-header">
                <div>
                    <h1 className="dashboard-title">Dashboard Overview</h1>
                    <p className="dashboard-subtitle">Welcome back, {user?.name || 'Guest'}</p>
                </div>
                <div className="glass-card stats-card">
                    <span className="stat-label">Total Appointments</span>
                    <span className="stat-value">{appointments.length}</span>
                </div>
            </header>

            <section className="dashboard-section">
                <h2 className="section-title">Upcoming Appointments</h2>
                <div className="glass-card table-card">
                    {loading ? (
                        <p style={{ textAlign: 'center', padding: '2rem' }}>Loading appointments...</p>
                    ) : (
                        <table className="dashboard-table">
                            <thead>
                                <tr className="table-header">
                                    <th className="table-th">Patient Name</th>
                                    <th className="table-th">Email</th>
                                    <th className="table-th">Phone</th>
                                    <th className="table-th">Status</th>
                                    <th className="table-th">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentAppointments.map((patient) => (
                                    <tr key={patient.id} className="table-tr">
                                        <td className="table-td"><strong>{patient.name}</strong></td>
                                        <td className="table-td">{patient.email}</td>
                                        <td className="table-td">
                                            {visiblePhoneIds.includes(patient.id) ? patient.phone : "••••••••"}
                                        </td>
                                        <td className="table-td">
                                            <span className="status-badge">Confirmed</span>
                                        </td>
                                        <td className="table-td">
                                            <button
                                                onClick={() => togglePhone(patient.id)}
                                                className="btn btn-primary"
                                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                                            >
                                                {visiblePhoneIds.includes(patient.id) ? "Hide Phone" : "Show Phone"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                {!loading && (
                    <div className="pagination-wrapper">
                        <button
                            className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                        >
                            ← Previous
                        </button>
                        <span className="pagination-info">Page {currentPage} of {totalPages}</span>
                        <button
                            className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                        >
                            Next →
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Dashboard;
