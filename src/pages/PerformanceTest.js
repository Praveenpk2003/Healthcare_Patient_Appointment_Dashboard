import React, { useState, useEffect } from 'react';

const PerformanceTest = () => {
    const [count, setCount] = useState(0);

    const testFunction = () => {
        console.log("Normal Function Called");
    };
    testFunction();

    useEffect(() => {
        console.log("Component Mounted");
    }, []);

    return (
        <div className="animate-fade-in">
            <header className="perf-header">
                <h1>Performance Optimization Test</h1>
            </header>
            <div className="glass-card" style={{ marginTop: '2rem', textAlign: 'center' }}>
                <div style={{ margin: '1.5rem 0' }}>
                    <span className="perf-count">Current Count: {count}</span>
                </div>
                <button onClick={() => setCount(count + 1)} className="btn btn-primary">
                    Click here!
                </button>
            </div>
        </div>
    );
};

export default PerformanceTest;
