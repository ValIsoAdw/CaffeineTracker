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
    const { labels, data } = getChartData(drinks);

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
