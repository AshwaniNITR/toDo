// WeatherInfo.jsx
import React from 'react';
import './WeatherInfo.css';

export const WeatherInfo = ({ weatherData }) => {
  // If there was an error fetching the weather
  if (weatherData.error) {
    return (
      <div className="weather-error">
        <p>Weather info not available: {weatherData.error}</p>
      </div>
    );
  }

  // If the weather data is loading
  if (weatherData.loading) {
    return (
      <div className="weather-loading">
        <p>Loading weather information...</p>
      </div>
    );
  }

  // If the weather data is available
  const { temp, description, icon, humidity, windSpeed } = weatherData.data;
  
  // Get weather condition for dynamic styling
  const weatherCondition = description.toLowerCase();
  
  return (
    <div 
      className="weather-info"
      data-weather={weatherCondition}
    >
      <h4>Weather Conditions</h4>
      <div className="weather-content">
        <div className="weather-main">
          <img 
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`} 
            alt={description}
            className="weather-icon"
          />
          <div className="weather-temp">
            <span className="temp">{Math.round(temp)}</span>
            <span className="description">{description}</span>
          </div>
        </div>
        <div className="weather-details">
          <div className="weather-detail">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{humidity}</span>
          </div>
          <div className="weather-detail">
            <span className="detail-label">Wind</span>
            <span className="detail-value">{windSpeed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};