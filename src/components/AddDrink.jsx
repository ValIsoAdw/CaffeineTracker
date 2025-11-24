import React, { useState, useEffect } from 'react';

const DEFAULT_DRINKS = [
    { name: 'Coffee (Cup)', amount: 95 },
    { name: 'Espresso (Shot)', amount: 63 },
    { name: 'Tea (Cup)', amount: 26 },
    { name: 'Soda (Can)', amount: 40 },
    { name: 'Energy Drink (Can)', amount: 80 },
    { name: 'Custom', amount: 0 },
];

const AddDrink = ({ onAdd }) => {
    const [customDrinks, setCustomDrinks] = useState([]);
    const [allDrinks, setAllDrinks] = useState(DEFAULT_DRINKS);
    const [selectedDrink, setSelectedDrink] = useState(DEFAULT_DRINKS[0].name);
    const [amount, setAmount] = useState(DEFAULT_DRINKS[0].amount);
    const [volume, setVolume] = useState(200); // Default 200ml
    const [time, setTime] = useState('');
    const [isCustomDrink, setIsCustomDrink] = useState(false);

    // Load custom drinks from localStorage
    useEffect(() => {
        const loadCustomDrinks = () => {
            const saved = localStorage.getItem('caffeine-custom-drinks');
            const customs = saved ? JSON.parse(saved) : [];
            setCustomDrinks(customs);

            // Merge default and custom drinks
            const merged = [
                ...DEFAULT_DRINKS.slice(0, -1), // All except "Custom"
                ...customs.map(d => ({
                    name: d.name,
                    amount: 0,
                    caffeinePerHundredMl: d.caffeinePerHundredMl,
                    isCustom: true
                })),
                DEFAULT_DRINKS[DEFAULT_DRINKS.length - 1], // "Custom" at the end
            ];
            setAllDrinks(merged);
        };

        loadCustomDrinks();

        // Listen for changes to custom drinks
        const handleCustomDrinksChanged = () => loadCustomDrinks();
        window.addEventListener('customDrinksChanged', handleCustomDrinksChanged);
        return () => window.removeEventListener('customDrinksChanged', handleCustomDrinksChanged);
    }, []);

    const handleDrinkChange = (e) => {
        const name = e.target.value;
        setSelectedDrink(name);
        const drink = allDrinks.find(d => d.name === name);
        if (drink) {
            if (drink.isCustom) {
                setIsCustomDrink(true);
                // Calculate caffeine based on volume
                const calculatedAmount = (volume / 100) * drink.caffeinePerHundredMl;
                setAmount(Math.round(calculatedAmount));
            } else {
                setIsCustomDrink(false);
                setAmount(drink.amount); // This will set it to 0 for "Custom"
            }
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);

        // Recalculate caffeine if it's a custom drink
        if (isCustomDrink) {
            const drink = allDrinks.find(d => d.name === selectedDrink);
            if (drink && drink.caffeinePerHundredMl) {
                const calculatedAmount = (newVolume / 100) * drink.caffeinePerHundredMl;
                setAmount(Math.round(calculatedAmount));
            }
        }
    };

    const setNow = () => {
        const now = new Date();
        // Format for time input: HH:mm
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        setTime(`${hours}:${minutes}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || !time) return;

        // Combine today's date with the selected time
        const [hours, minutes] = time.split(':');
        const now = new Date();
        const drinkTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hours), parseInt(minutes));

        onAdd({
            id: Date.now(),
            name: selectedDrink,
            amount: parseInt(amount),
            time: drinkTime.toISOString(),
        });

        // Reset form
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
                                {d.name}
                                {d.isCustom && ` (${d.caffeinePerHundredMl} mg/100ml)`}
                            </option>
                        ))}
                    </select>
                </div>

                {isCustomDrink && (
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
                )}

                <div className="mb-4">
                    <label>Caffeine Amount (mg)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="0"
                        disabled={isCustomDrink}
                    />
                </div>

                <div className="mb-4">
                    <label>Time</label>
                    <div className="flex-row">
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                        <button type="button" className="btn-secondary" onClick={setNow}>Now</button>
                    </div>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%' }}>Add Drink</button>
            </form>
        </div>
    );
};

export default AddDrink;
