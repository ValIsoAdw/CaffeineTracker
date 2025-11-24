import React from 'react';

const CustomLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <defs>
            {/* Gradients */}
            <linearGradient id="cupGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#26A69A', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#4DB6AC', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#00897B', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="handleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#00796B', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#26A69A', stopOpacity: 1 }} />
            </linearGradient>
            <radialGradient id="saucerGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{ stopColor: '#B2DFDB', stopOpacity: 1 }} />
                <stop offset="80%" style={{ stopColor: '#80CBC4', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#4DB6AC', stopOpacity: 1 }} />
            </radialGradient>
            <radialGradient id="coffeeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{ stopColor: '#5D4037', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#3E2723', stopOpacity: 1 }} />
            </radialGradient>
            <linearGradient id="steamGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0 }} />
                <stop offset="50%" style={{ stopColor: '#ffffff', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0 }} />
            </linearGradient>
            {/* Clip Path for Liquid to stay inside cup */}
            <clipPath id="cupInnerClip">
                <path d="M130,180 C130,180 140,380 180,400 L332,400 C372,380 382,180 382,180 Z" />
            </clipPath>
            {/* Mask for the rising liquid animation */}
            <mask id="liquidRiseMask">
                <rect x="0" y="0" width="512" height="512" fill="white" />
                <rect x="0" y="0" width="512" height="512" fill="black">
                    <animate attributeName="y" from="180" to="-250" dur="4s" repeatCount="indefinite" fill="freeze" calcMode="spline" keyTimes="0; 0.7; 1" keySplines="0.42 0 0.58 1; 0 0 1 1" values="180; -250; -250" />
                </rect>
            </mask>
        </defs>
        {/* Saucer */}
        <ellipse cx="256" cy="410" rx="180" ry="45" fill="url(#saucerGradient)" />
        <ellipse cx="256" cy="410" rx="130" ry="30" fill="#00695C" opacity="0.2" />
        {/* Handle (Back part) */}
        <path d="M380,200 C440,200 440,300 380,320" fill="none" stroke="url(#handleGradient)" strokeWidth="25" strokeLinecap="round" />
        {/* Cup Body Background (The ceramic) */}
        <path d="M130,180 C130,180 140,380 180,400 L332,400 C372,380 382,180 382,180" fill="url(#cupGradient)" />
        {/* Retro Stripes */}
        <path d="M135,250 C140,260 372,260 377,250" fill="none" stroke="#FFCCBC" strokeWidth="15" opacity="0.8" />
        <path d="M142,320 C147,330 365,330 370,320" fill="none" stroke="#FFCCBC" strokeWidth="10" opacity="0.8" />
        {/* Cup Interior (Dark shadow inside) */}
        <ellipse cx="256" cy="180" rx="126" ry="35" fill="#004D40" />
        {/* Coffee Liquid */}
        <g clipPath="url(#cupInnerClip)">
            {/* The liquid body */}
            <g>
                {/* Animation of the liquid level rising */}
                <animateTransform attributeName="transform" type="translate" from="0, 240" to="0, 0" dur="4s" repeatCount="indefinite" calcMode="spline" keyTimes="0; 0.6; 0.8; 1" keySplines="0.42 0 0.58 1; 0 0 1 1; 0 0 1 1" values="0,240; 0,30; 0,30; 0,240" />
                {/* Liquid Surface */}
                <ellipse cx="256" cy="180" rx="126" ry="35" fill="#4E342E" />
                {/* Liquid Volume */}
                <rect x="100" y="180" width="312" height="250" fill="url(#coffeeGradient)" />
            </g>
        </g>
        {/* Cup Rim (Front lip to cover liquid edges) */}
        <path d="M130,180 A126,35 0 0,0 382,180" fill="none" stroke="#80CBC4" strokeWidth="4" />
        <path d="M130,180 A126,35 0 0,0 382,180" fill="none" stroke="#B2DFDB" strokeWidth="2" transform="translate(0, -2)" />
        {/* Reflection/Highlight on Cup Body */}
        <path d="M160,200 Q150,300 170,380" fill="none" stroke="white" strokeWidth="10" strokeOpacity="0.2" strokeLinecap="round" />
        <path d="M180,210 Q175,280 185,360" fill="none" stroke="white" strokeWidth="4" strokeOpacity="0.1" strokeLinecap="round" />
        {/* Steam Animation */}
        <g transform="translate(256, 140)" opacity="0">
            <path d="M-20,0 Q-40,-30 -20,-60 T-20,-120" fill="none" stroke="url(#steamGradient)" strokeWidth="6" strokeLinecap="round">
                <animate attributeName="d" values="M-20,0 Q-40,-30 -20,-60 T-20,-120; M-20,0 Q0,-30 -20,-60 T-40,-120; M-20,0 Q-40,-30 -20,-60 T-20,-120" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M20,0 Q40,-30 20,-60 T20,-120" fill="none" stroke="url(#steamGradient)" strokeWidth="6" strokeLinecap="round">
                <animate attributeName="d" values="M20,0 Q40,-30 20,-60 T20,-120; M20,0 Q0,-30 20,-60 T40,-120; M20,0 Q40,-30 20,-60 T20,-120" dur="4s" repeatCount="indefinite" />
            </path>
            <path d="M0,-10 Q20,-40 0,-70 T0,-130" fill="none" stroke="url(#steamGradient)" strokeWidth="6" strokeLinecap="round">
                <animate attributeName="d" values="M0,-10 Q20,-40 0,-70 T0,-130; M0,-10 Q-20,-40 0,-70 T20,-130; M0,-10 Q20,-40 0,-70 T0,-130" dur="3.5s" repeatCount="indefinite" />
            </path>
            {/* Steam Opacity Fade In/Out synced with coffee fill */}
            <animate attributeName="opacity" values="0; 0; 0.6; 0.6; 0" keyTimes="0; 0.4; 0.6; 0.8; 1" dur="4s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="translate" values="256,140; 256,130" dur="4s" repeatCount="indefinite" />
        </g>
    </svg>
);

export default CustomLogo;
