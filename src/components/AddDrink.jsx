import React, { useState, useEffect } from 'react';

// Default drink options – now include caffeine per 100 ml for accurate custom calculations
const DEFAULT_DRINKS = [
    { name: 'Coffee', amount: 95, caffeinePerHundredMl: 80 },
    { name: 'Espresso (standard 30 ml)', amount: 63, caffeinePerHundredMl: 210 },
    { name: 'Tea', amount: 26, caffeinePerHundredMl: 11 },
    { name: 'Soda', amount: 55, caffeinePerHundredMl: 11 },
    { name: 'Energy Drink', amount: 100, caffeinePerHundredMl: 32 },
    { name: 'Custom', amount: 0, caffeinePerHundredMl: 0 },
];

const AddDrink = ({ onAdd }) => {
    const [customDrinks, setCustomDrinks] = useState([]);
    const [allDrinks, setAllDrinks] = useState(DEFAULT_DRINKS);
    const [selectedDrink, setSelectedDrink] = useState(DEFAULT_DRINKS[0].name);
    const [caffeinePerHundredMl, setCaffeinePerHundredMl] = useState(DEFAULT_DRINKS[0].caffeinePerHundredMl);
    const [volume, setVolume] = useState(200); // Default 200 ml
    const [time, setTime] = useState('');
    const [isCustomDrink, setIsCustomDrink] = useState(false);

    // Load custom drinks from localStorage and merge with defaults
    useEffect(() => {
        const loadCustomDrinks = () => {
            const saved = localStorage.getItem('caffeine-custom-drinks');
            const customs = saved ? JSON.parse(saved) : [];
            setCustomDrinks(customs);
            const merged = [
                ...DEFAULT_DRINKS.slice(0, -1), // all defaults except the "Custom" placeholder
                ...customs.map(d => ({
                    name: d.name,
                    amount: 0,
                    caffeinePerHundredMl: d.caffeinePerHundredMl,
                    isCustom: true,
                })),
                DEFAULT_DRINKS[DEFAULT_DRINKS.length - 1], // the "Custom" placeholder at the end
            ];
            setAllDrinks(merged);
        };
        loadCustomDrinks();
        const handleCustomDrinksChanged = () => loadCustomDrinks();
        window.addEventListener('customDrinksChanged', handleCustomDrinksChanged);
        return () => window.removeEventListener('customDrinksChanged', handleCustomDrinksChanged);
    }, []);

    const handleDrinkChange = e => {
        const name = e.target.value;
        setSelectedDrink(name);
        const drink = allDrinks.find(d => d.name === name);
        if (drink) {
            setIsCustomDrink(drink.isCustom || false);
            setCaffeinePerHundredMl(drink.caffeinePerHundredMl);
        }
    };

    const handleVolumeChange = e => {
        const newVolume = e.target.value;
        setVolume(newVolume);
    };

    const setNow = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        setTime(`${hours}:${minutes}`);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!caffeinePerHundredMl || !volume || !time) return;

        // Calculate total caffeine amount from concentration and volume
        const totalCaffeine = Math.round((volume / 100) * caffeinePerHundredMl);

        const [hours, minutes] = time.split(':');
        const now = new Date();
        const drinkTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hours), parseInt(minutes));
        onAdd({
            id: Date.now(),
            name: selectedDrink,
            amount: totalCaffeine,
            time: drinkTime.toISOString(),
        });
        setTime('');
    };

    return (
        <div className="card">
            <h2>Add Caffeine</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label>Drink Type</label>
                    <select value={selectedDrink} onChange={handleDrinkChange}>
                        {allDrinks.map(d => (
                            <option key={d.name} value={d.name}>
                                {d.name}{d.isCustom && ` (${d.caffeinePerHundredMl} mg/100ml)`}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label>Volume (ml)</label>
                    <input
                        type="number"
                        value={volume}
                        onChange={handleVolumeChange}
                        min="0"
                        step="10"
                    />
                </div>
                <div className="mb-4">
                    <label>Caffeine (mg/100ml)</label>
                    <input
                        type="number"
                        value={caffeinePerHundredMl}
                        onChange={e => setCaffeinePerHundredMl(e.target.value)}
                        min="0"
                        step="1"
                    />
                </div>
                <div className="mb-4">
                    <label>Total Caffeine: {Math.round((volume / 100) * caffeinePerHundredMl)} mg</label>
                </div>
                <div className="mb-4">
                    <label>Time</label>
                    <div className="flex-row">
                        <input type="time" value={time} onChange={e => setTime(e.target.value)} />
                        <button type="button" className="btn-secondary" onClick={setNow}>Now</button>
                    </div>
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>Add Drink</button>
            </form>
        </div>
    );
};

export default AddDrink;
