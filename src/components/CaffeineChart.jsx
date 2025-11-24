import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getChartData } from '../utils/caffeine';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const CaffeineChart = ({ drinks }) => {
    const { labels, data, currentTimeIndex, currentLevel } = getChartData(drinks);

    // Create array with null values except at current time position
    const currentTimeData = new Array(labels.length).fill(null);
    // Find the closest index to current time
    const closestIndex = Math.round(currentTimeIndex);
    console.log('Current time index:', currentTimeIndex, 'Closest index:', closestIndex, 'Current level:', currentLevel);

    // Always set the current level, even if it's 0
    if (closestIndex >= 0 && closestIndex < labels.length) {
        currentTimeData[closestIndex] = data[closestIndex]; // Use the data point from the main dataset
    }

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Caffeine Level (mg)',
                data: data,
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.2)',
                tension: 0.4,
                fill: true,
                pointRadius: 3,
                order: 2,
            },
            {
                label: 'Current Time',
                data: currentTimeData,
                borderColor: '#ef4444',
                backgroundColor: '#ef4444',
                pointRadius: 8,
                pointHoverRadius: 10,
                showLine: false,
                order: 1, // Render on top
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Today\'s Caffeine Curve',
                color: '#94a3b8'
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#334155'
                },
                ticks: {
                    color: '#94a3b8'
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#94a3b8',
                    maxTicksLimit: 8
                }
            }
        }
    };

    return (
        <div className="card">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default CaffeineChart;
