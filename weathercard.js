export default function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="bg-white shadow-lg rounded p-6 text-center mt-4">
      <h2 className="text-xl font-semibold">{weather.name}</h2>
      <p className="text-gray-600">{weather.weather[0].description}</p>
      <p className="text-3xl font-bold">{weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
}
