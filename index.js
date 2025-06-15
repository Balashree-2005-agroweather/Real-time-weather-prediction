// pages/index.js
import { useState, useEffect } from 'react';

export default function Home() {
  const [city, setCity] = useState('New York');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchWeather() {
      try {
        setError('');
        const res = await fetch(`/api/weather?city=${city}`);
        const data = await res.json();
        if (data.error) {
          setError(data.error);
          setWeather(null);
        } else {
          setWeather(data);
        }
      } catch {
        setError('Failed to fetch weather.');
      }
    }
    fetchWeather();
  }, [city]);

  return (
    <div className="min-h-screen bg-blue-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Weather App</h1>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-4">
        <input
          type="text"
          placeholder="Enter city"
          className="w-full p-2 border rounded mb-4"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        {weather && (
          <div>
            <h2 className="text-xl font-semibold">{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
