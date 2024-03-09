import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    setCurrentPage(1); // Reset page number on search
    setWeatherData(null); // Clear previous weather data
  };

  return (
    <div >
      <div style={{ justifyContent: 'center', display: 'flex', gap: '4px', }}>

        <span style={{ color: 'orange' }}>Weather in your City</span>
        <input type="text" id="city" value={city} onChange={handleCityChange} />
        <button style={{ backgroundColor: 'orange', color: 'white' }} onClick={handleCityChange}>Search</button>
      </div><br />
      <div style={{ justifyContent: 'center', display: 'flex', gap: '8px', }}>


        {weatherData ? (
          <>
            {currentForecasts.map((forecast, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <table style={{ margin: 'auto', borderCollapse: 'collapse', border: '1px solid black' }}>
                  <thead>
                    <tr>
                      <th colSpan="2" style={{ border: '1px solid black', padding: '8px', backgroundColor: 'orange', color: 'black' }}>Date:{forecast.dt_txt}</th>
                    </tr>
                    <tr>
                      <th colSpan="2" style={{ border: '1px solid black', padding: '8px' }}>Temperature</th>
                    </tr>
                    <tr>
                      <th style={{ border: '1px solid black', padding: '8px' }}>Min </th>
                      <th style={{ border: '1px solid black', padding: '8px' }}>Max </th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{forecast.main.temp_min}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{forecast.main.temp_max}</td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid black', padding: '8px' }}>Pressure</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{forecast.main.pressure}</td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid black', padding: '8px' }}>Humidity</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{forecast.main.humidity}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}

            <br />



          </>
        ) : (
          <p >No data available</p>
        )}
      </div>
    </div>
  );
};

export default App;
