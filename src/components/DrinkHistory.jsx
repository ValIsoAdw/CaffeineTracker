import React from 'react';

const DrinkHistory = ({ drinks, onDelete }) => {
    // Filter drinks to only show today's entries
    const getTodaysDrinks = () => {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

        return drinks
            .filter(drink => {
                const drinkTime = new Date(drink.time);
                return drinkTime >= startOfDay && drinkTime <= endOfDay;
            })
            .sort((a, b) => new Date(b.time) - new Date(a.time)); // Most recent first
    };

    const todaysDrinks = getTodaysDrinks();

    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (todaysDrinks.length === 0) {
        return (
            <div className="card">
                <h2>Today's Drinks</h2>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '1rem 0' }}>
                    No drinks logged today
                </p>
            </div>
        );
    }

    return (
        <div className="card">
            <h2>Today's Drinks</h2>
            <ul className="drink-history-list">
                {todaysDrinks.map(drink => (
                    <li key={drink.id} className="drink-history-item">
                        <div className="drink-info">
                            <div className="drink-name">{drink.name}</div>
                            <div className="drink-details">
                                {formatTime(drink.time)} • {drink.amount}mg
                            </div>
                        </div>
                        <button
                            className="btn-delete"
                            onClick={() => onDelete(drink.id)}
                            aria-label={`Delete ${drink.name}`}
                        >
                            ×
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DrinkHistory;
