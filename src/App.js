import './index.css';

import CityList from './components/CityList';
import CurrentWeather from './components/CurrentWeather';
import ForecastWeather from './components/ForecastWeather';
import getFormattedWeatherData from './data/WeatherData';
import { useState, useEffect } from 'react';

function App() {
  const [query, setQuery] = useState({ q: "ottawa" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async() => {
      await getFormattedWeatherData({...query, units}).then(
        (data) => {
          setWeather(data);
        });
    }
    fetchWeatherData();
  }, [query, units]);


  return (
    <div className="App">
      <CityList setQuery={setQuery} />

      {weather && (
        <div className="container">
          <CurrentWeather weather={weather} />
          <ForecastWeather items={weather.daily} />
        </div>
      )}
     
    </div>
  );
}

export default App;
