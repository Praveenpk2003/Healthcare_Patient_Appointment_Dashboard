import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PatientProvider } from './context/PatientContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import PatientDetails from './pages/PatientDetails';
import PerformanceTest from './pages/PerformanceTest';
import PrivateRoute from './components/PrivateRoute'; 

function App() {
    return (
        <PatientProvider>
            <Router>
                <div className="app">
                    <Navbar />
                    <main className="container">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/dashboard"
                                element={
                                  //  <PrivateRoute>
                                        <Dashboard />
                                 //  </PrivateRoute>
                                }
                            />
                            <Route
                                path="/patients"
                                element={
                                 //   <PrivateRoute>
                                        <Patients />
                                 //   </PrivateRoute>
                                }
                            />
                            <Route
                                path="/patient-details/:id"
                                element={
                                   // <PrivateRoute>
                                        <PatientDetails />
                                   // </PrivateRoute>
                                }
                            />
                            <Route
                                path="/performance-test"
                                element={
                                   // <PrivateRoute>
                                        <PerformanceTest />
                                  //  </PrivateRoute>
                                }
                            />
                            <Route path="/" element={<Login />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </PatientProvider>
    );
}

export default App;
