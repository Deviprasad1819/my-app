// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [forecastsPerPage, setForecastsPerPage] = useState(5);
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=1635890035cbba097fd5c26c8ea672a1`);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const indexOfLastForecast = currentPage * forecastsPerPage;
  const indexOfFirstForecast = indexOfLastForecast - forecastsPerPage;
  const currentForecasts = weatherData ? weatherData.list.slice(indexOfFirstForecast, indexOfLastForecast) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleForecastsPerPageChange = (event) => {
    setForecastsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setWeatherData(null);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="city-input">
          <span style={{ color: 'orange' }}>Enter City Name:</span>
          <input type="text" id="city" value={city} onChange={handleCityChange} />
          <button style={{ backgroundColor: 'orange', color: 'white' }} onClick={handleSearch}>Search</button>
        </div>
      </div>
      <br />
      <div className="weather-container">
        {weatherData ? (
          <>
            {currentForecasts.map((forecast, index) => (
              <div key={index} className="forecast-card">
                <table className="forecast-table">
                  <thead>
                    <tr>
                      <th colSpan="2" className="orange">Date: {forecast.dt_txt}</th>
                    </tr>
                    <tr>
                      <th colSpan="2">Temperature</th>
                    </tr>
                    <tr>
                      <th>Min</th>
                      <th>Max</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{forecast.main.temp_min}</td>
                      <td>{forecast.main.temp_max}</td>
                    </tr>
                    <tr>
                      <td>Pressure</td>
                      <td>{forecast.main.pressure}</td>
                    </tr>
                    <tr>
                      <td>Humidity</td>
                      <td>{forecast.main.humidity}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default App;
