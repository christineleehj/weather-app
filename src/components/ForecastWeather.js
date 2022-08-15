import { iconCode } from "../data/WeatherData";
import { WeatherIcons } from "../data/WeatherData";

function ForecastWeather({ items }) {
  return (
    <div className="forecast">
      {items.map(item => (
        <div key={item.title} className="forecast__daily">
          <div className="forecast__daily__day">
            <h3>{item.title}</h3>
          </div>
          <div className="forecast__daily__icon">
            <img src={WeatherIcons[iconCode(item.icon)]} alt="" />
          </div>
          <div className="forecast__daily__temp">
            <h4>{`${item.temp.toFixed()}°`}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ForecastWeather;
