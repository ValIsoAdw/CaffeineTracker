import React, { useState, useEffect } from 'react';

const CustomDrinkManager = () => {
    const [customDrinks, setCustomDrinks] = useState(() => {
        const saved = localStorage.getItem('caffeine-custom-drinks');
        return saved ? JSON.parse(saved) : [];
    });
    const [newDrinkName, setNewDrinkName] = useState('');
    const [newDrinkCaffeine, setNewDrinkCaffeine] = useState('');

    useEffect(() => {
        localStorage.setItem('caffeine-custom-drinks', JSON.stringify(customDrinks));
        // Dispatch event to notify AddDrink component
        window.dispatchEvent(new Event('customDrinksChanged'));
    }, [customDrinks]);

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newDrinkName.trim() || !newDrinkCaffeine) return;

        const newDrink = {
            id: Date.now(),
            name: newDrinkName.trim(),
            caffeinePerHundredMl: parseFloat(newDrinkCaffeine),
        };

        setCustomDrinks(prev => [...prev, newDrink]);
        setNewDrinkName('');
        setNewDrinkCaffeine('');
    };

    const handleDelete = (id) => {
        setCustomDrinks(prev => prev.filter(drink => drink.id !== id));
    };

    return (
        <div className="card">
            <h2>Manage Custom Drinks</h2>

            <form onSubmit={handleAdd} className="mb-4">
                <div className="mb-4">
                    <label>Drink Name</label>
                    <input
                        type="text"
                        value={newDrinkName}
                        onChange={(e) => setNewDrinkName(e.target.value)}
                        placeholder="e.g., Juhla Mokka"
                    />
                </div>
                <div className="mb-4">
                    <label>Caffeine (mg/100ml)</label>
                    <input
                        type="number"
                        value={newDrinkCaffeine}
                        onChange={(e) => setNewDrinkCaffeine(e.target.value)}
                        placeholder="e.g., 80"
                        min="0"
                        step="0.1"
                    />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                    Add Custom Drink
                </button>
            </form>

            {customDrinks.length > 0 && (
                <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Saved Drinks</h3>
                    <ul className="custom-drink-list">
                        {customDrinks.map(drink => (
                            <li key={drink.id} className="custom-drink-item">
                                <span>
                                    <strong>{drink.name}</strong> - {drink.caffeinePerHundredMl} mg/100ml
                                </span>
                                <button
                                    className="btn-delete"
                                    onClick={() => handleDelete(drink.id)}
                                    aria-label={`Delete ${drink.name}`}
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CustomDrinkManager;
