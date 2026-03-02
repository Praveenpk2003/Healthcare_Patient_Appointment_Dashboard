import React, { createContext, useState, useContext } from 'react';

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <PatientContext.Provider value={{ user, login, logout }}>
            {children}
        </PatientContext.Provider>
    );
};

export const usePatient = () => {
    const context = useContext(PatientContext);
    if (!context) {
        throw new Error('usePatient must be used within a PatientProvider');
    }
    return context;
};
