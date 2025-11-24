import React, { useState, useEffect } from 'react';
import AddDrink from './components/AddDrink';
import Status from './components/Status';
import CaffeineChart from './components/CaffeineChart';
import { calculateTotalLevel } from './utils/caffeine';

function App() {
  const [drinks, setDrinks] = useState(() => {
    const saved = localStorage.getItem('caffeine-drinks');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    localStorage.setItem('caffeine-drinks', JSON.stringify(drinks));
  }, [drinks]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const addDrink = (drink) => {
    setDrinks(prev => [...prev, drink].sort((a, b) => new Date(a.time) - new Date(b.time)));
  };

  const currentLevel = calculateTotalLevel(drinks, currentTime);

  return (
    <div className="app-container">
      <h1 className="text-center">Caffeine Tracker</h1>

      <Status currentLevel={currentLevel} />

      <CaffeineChart drinks={drinks} />

      <AddDrink onAdd={addDrink} />

      <div className="text-center" style={{ marginTop: '2rem', color: '#64748b', fontSize: '0.8rem' }}>
        <p>Based on a 5-hour half-life formula.</p>
      </div>
    </div>
  );
}

export default App;
