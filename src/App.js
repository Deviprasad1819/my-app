import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [forecastsPerPage, setForecastsPerPage] = useState(5);
  const [city, setCity] = useState('');
  // enter city Califonia
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

  return (
    <div style={{ margin: '100px 300px 0px 300px' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Weather Forecast for {city}</h2>
        <div>
          <label htmlFor="city">Enter Country Name:</label>
          <input type="text" id="city" value={city} onChange={handleCityChange} />
        </div><br />
        {weatherData && (
          <>
            <table style={{ margin: 'auto', borderCollapse: 'collapse', border: '1px solid black' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Date</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Temperature (Kelvin)</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {currentForecasts.map((forecast, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{forecast.dt_txt}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{forecast.main.temp}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{forecast.weather[0].description}</td>
                  </tr>
                ))}
              </tbody>
            </table>


            <br />
            <div style={{ textAlign: 'right', marginRight: '300px' }}>
              <span style={{ margin: '30px' }}>
                <label htmlFor="forecastsPerPage">Forecasts per page:</label>
                <select id="forecastsPerPage" onChange={handleForecastsPerPageChange} value={forecastsPerPage}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </span>
              <span className="pagination">
                {[...Array(Math.ceil(weatherData.list.length / forecastsPerPage)).keys()].map((pageNumber) => (
                  <span key={pageNumber} className={currentPage === pageNumber + 1 ? 'active' : ''}>
                    <button onClick={() => paginate(pageNumber + 1)}>{pageNumber + 1}</button>
                  </span>
                ))}
              </span>

            </div>


          </>
        )}
      </div>
    </div>
  );
};

export default App;
