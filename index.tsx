import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();
      if (res.ok) {
        setWeather(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-blue-100">
      <h1 className="text-2xl font-bold mb-4">Weather Forecast</h1>
      <input
        className="p-2 border rounded mb-2"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={getWeather}>
        Get Weather
      </button>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {weather && (
        <div className="mt-4 bg-white p-4 rounded shadow">
          <h2 className="text-xl">{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>{Math.round(weather.main.temp)}°C</p>
        </div>
      )}
    </div>
  );
}