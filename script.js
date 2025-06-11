const form = document.getElementById("weatherForm");
const resultDiv = document.getElementById("weatherResult");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = document.getElementById("cityInput").value;

  const apiKey = "your_openweathermap_api_key"; // Replace with your API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === 200) {
      resultDiv.innerHTML = `
        <p><strong>${data.name}, ${data.sys.country}</strong></p>
        <p>${data.weather[0].main} - ${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity}%</p>
      `;
    } else {
      resultDiv.innerHTML = `<p>City not found.</p>`;
    }
  } catch (err) {
    resultDiv.innerHTML = `<p>Error fetching data.</p>`;
  }
});
