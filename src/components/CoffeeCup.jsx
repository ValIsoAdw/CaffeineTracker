import React from 'react';
import './CoffeeCup.css';

const CoffeeCup = ({ volume }) => {
    const maxVolume = 200; // match default max volume
    const fillPercent = Math.min(100, Math.max(0, (volume / maxVolume) * 100));
    // Calculate y position so that fill rises from bottom
    const cupHeight = 80; // height of cup interior in SVG units
    const fillHeight = (cupHeight * fillPercent) / 100;
    const yPos = 10 + (cupHeight - fillHeight);

    return (
        <div className="coffee-cup">
            <svg viewBox="0 0 100 120" preserveAspectRatio="xMidYMid meet">
                {/* Cup outline */}
                <path d="M20 10 h60 v80 h-60 z" fill="#fff" stroke="#555" strokeWidth="2" />
                {/* Coffee fill */}
                <rect x="20" y={yPos} width="60" height={fillHeight} fill="#6f4e37" />
            </svg>
        </div>
    );
};

export default CoffeeCup;
