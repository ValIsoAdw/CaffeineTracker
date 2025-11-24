export const HALF_LIFE_HOURS = 5;

export const calculateRemaining = (amount, timeElapsedHours, halfLife = HALF_LIFE_HOURS) => {
  if (timeElapsedHours < 0) return 0; // Future drink
  return amount * Math.pow(0.5, timeElapsedHours / halfLife);
};

export const calculateTotalLevel = (drinks, targetTime = new Date()) => {
  return drinks.reduce((total, drink) => {
    const timeElapsed = (targetTime - new Date(drink.time)) / (1000 * 60 * 60); // in hours
    return total + calculateRemaining(drink.amount, timeElapsed);
  }, 0);
};

export const getChartData = (drinks) => {
  const labels = [];
  const data = [];
  
  // Generate data for every hour of the current day (00:00 to 23:59)
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  
  for (let i = 0; i <= 24; i++) {
    const time = new Date(startOfDay.getTime() + i * 60 * 60 * 1000);
    labels.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    data.push(calculateTotalLevel(drinks, time));
  }
  
  return { labels, data };
};
