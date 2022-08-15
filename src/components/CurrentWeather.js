import { iconCode } from "../data/WeatherData";
import { WeatherIcons } from "../data/WeatherData";

function CurrentWeather({weather: {details, name, icon, temp }}) {
    return (
        <div className="currWeather">
           <h2>Today</h2>
           <div className="currWeather__details">
                <img src={WeatherIcons[iconCode(icon)]} alt="" />
                <div>
                    <h1>{`${temp.toFixed()}°`}</h1>
                    <h2>{`${details}`}</h2>
                </div>
           </div>
        </div>
    )
}

export default CurrentWeather;