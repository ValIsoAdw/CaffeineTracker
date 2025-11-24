import React, { useState, useEffect } from 'react';

// Default drink options – now include caffeine per 100 ml for accurate custom calculations
const DEFAULT_DRINKS = [
    { name: 'Coffee (Cup)', amount: 95, caffeinePerHundredMl: 80 },
    { name: 'Espresso (Shot)', amount: 63, caffeinePerHundredMl: 210 },
    { name: 'Tea (Cup)', amount: 26, caffeinePerHundredMl: 11 },
    { name: 'Soda (Can)', amount: 40, caffeinePerHundredMl: 11 },
    { name: 'Energy Drink (Can)', amount: 80, caffeinePerHundredMl: 32 },
    { name: 'Custom', amount: 0, caffeinePerHundredMl: 0 },
];

const AddDrink = ({ onAdd }) => {
    const [customDrinks, setCustomDrinks] = useState([]);
    const [allDrinks, setAllDrinks] = useState(DEFAULT_DRINKS);
    const [selectedDrink, setSelectedDrink] = useState(DEFAULT_DRINKS[0].name);
    const [amount, setAmount] = useState(DEFAULT_DRINKS[0].amount);
    const [volume, setVolume] = useState(200); // Default 200 ml for custom drinks
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
            // Calculate caffeine based on volume and caffeinePerHundredMl
            if (drink.caffeinePerHundredMl > 0) {
                const calculatedAmount = (volume / 100) * drink.caffeinePerHundredMl;
                setAmount(Math.round(calculatedAmount));
            } else {
                setAmount(drink.amount);
            }
        }
    };

    const handleVolumeChange = e => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        // Recalculate caffeine for any drink with caffeinePerHundredMl
        const drink = allDrinks.find(d => d.name === selectedDrink);
        if (drink && drink.caffeinePerHundredMl > 0) {
            const calculatedAmount = (newVolume / 100) * drink.caffeinePerHundredMl;
            setAmount(Math.round(calculatedAmount));
        }
    };

    const setNow = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        setTime(`${hours}:${minutes}`);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!amount || !time) return;
        const [hours, minutes] = time.split(':');
        const now = new Date();
        const drinkTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hours), parseInt(minutes));
        onAdd({
            id: Date.now(),
            name: selectedDrink,
            amount: parseInt(amount),
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
                    <label>Caffeine Amount (mg)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        min="0"
                    />
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
