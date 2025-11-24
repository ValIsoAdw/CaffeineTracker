import React from 'react';

const Status = ({ currentLevel }) => {
    // Determine color based on level (arbitrary thresholds)
    let color = '#22c55e'; // Green
    if (currentLevel > 100) color = '#eab308'; // Yellow
    if (currentLevel > 300) color = '#ef4444'; // Red

    return (
        <div className="card text-center">
            <h3>Current Caffeine Level</h3>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: color }}>
                {Math.round(currentLevel)} <span style={{ fontSize: '1rem', color: '#94a3b8' }}>mg</span>
            </div>
            <p style={{ color: '#94a3b8', margin: 0 }}>In your blood stream</p>
        </div>
    );
};

export default Status;
