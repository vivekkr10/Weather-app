import React, { useState } from 'react';
import axios from 'axios';
import '../weather.css';

const Weather = () => {
  const apiKey = "3b75b1f5134e0f3097af6027490da6b6";

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchApi = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError("Please enter a city");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError("Failed to fetch weather data. Check your city name.");
    }
  };

  const getColor = (value, type) => {
    if (type === 'temp' || type === 'feels') {
      if (value <= 10) return '#b3e5fc'; // cool
      if (value <= 25) return '#fff3b0'; // neutral
      return '#ffab91'; // warm
    }
    if (type === 'humidity') {
      return value > 70 ? '#c5e1a5' : '#ffe082';
    }
    if (type === 'weather') {
      const desc = value.toLowerCase();
      if (desc.includes("clear")) return "#81d4fa";
      if (desc.includes("cloud")) return "#cfd8dc";
      if (desc.includes("rain")) return "#90caf9";
      return "#e0e0e0";
    }
  };

  return (
    <div className="weather-app">
      <div id="bgi">
        <form onSubmit={fetchApi} className="glass-box">
          <h1 className="title">Ultimate Weather</h1>
          <input
            type="text"
            placeholder="Search for a city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Check Weather</button>
        </form>
      </div>

      {error && <p className="error-msg">{error}</p>}

      {weatherData && (
        <div id="cards">
          <h2 className="location">{weatherData.name}</h2>
          <div id="cards-wrap">
            <div className="card" style={{ backgroundColor: getColor(weatherData.main.temp, 'temp') }}>
              <p className="label">Temperature</p>
              <p className="value">{weatherData.main.temp}°C</p>
            </div>

            <div className="card" style={{ backgroundColor: getColor(weatherData.main.feels_like, 'feels') }}>
              <p className="label">Feels Like</p>
              <p className="value">{weatherData.main.feels_like}°C</p>
            </div>

            <div className="card" style={{ backgroundColor: getColor(weatherData.main.humidity, 'humidity') }}>
              <p className="label">Humidity</p>
              <p className="value">{weatherData.main.humidity}%</p>
            </div>

            <div className="card" style={{ backgroundColor: getColor(weatherData.weather[0].description, 'weather') }}>
              <p className="label">Weather</p>
              <p className="value">{weatherData.weather[0].description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
