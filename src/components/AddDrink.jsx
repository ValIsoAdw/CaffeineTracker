import React, { useState } from 'react';

const DRINK_TYPES = [
    { name: 'Coffee (Cup)', amount: 95 },
    { name: 'Espresso (Shot)', amount: 63 },
    { name: 'Tea (Cup)', amount: 26 },
    { name: 'Soda (Can)', amount: 40 },
    { name: 'Energy Drink (Can)', amount: 80 },
    { name: 'Custom', amount: 0 },
];

const AddDrink = ({ onAdd }) => {
    const [selectedDrink, setSelectedDrink] = useState(DRINK_TYPES[0].name);
    const [amount, setAmount] = useState(DRINK_TYPES[0].amount);
    const [time, setTime] = useState('');

    const handleDrinkChange = (e) => {
        const name = e.target.value;
        setSelectedDrink(name);
        const drink = DRINK_TYPES.find(d => d.name === name);
        if (drink) {
            setAmount(drink.amount); // This will set it to 0 for Custom
        }
    };

    const setNow = () => {
        const now = new Date();
        // Format for datetime-local input: YYYY-MM-DDTHH:mm
        const localIsoString = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
        setTime(localIsoString);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || !time) return;

        onAdd({
            id: Date.now(),
            name: selectedDrink,
            amount: parseInt(amount),
            time: new Date(time).toISOString(),
        });

        // Reset form slightly but keep time or clear it? Let's clear it.
        setTime('');
    };

    return (
        <div className="card">
            <h2>Add Caffeine</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label>Drink Type</label>
                    <select value={selectedDrink} onChange={handleDrinkChange}>
                        {DRINK_TYPES.map(d => (
                            <option key={d.name} value={d.name}>{d.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label>Amount (mg)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="0"
                    />
                </div>

                <div className="mb-4">
                    <label>Time</label>
                    <div className="flex-row">
                        <input
                            type="datetime-local"
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
