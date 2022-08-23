import { DateTime } from "luxon";

const API_KEY = "47f4d0678e3a8b65857a1ec2118dc9b0";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = data => {
  const {
    coord: { lat, lon },
    main: { temp },
    name,
    weather
  } = data;

  const { main: details, icon } = weather[0];

  return { lat, lon, temp, name, details, icon };
};

const formatForecastWeather = data => {
  let { timezone, daily } = data;
  daily = daily.slice(1, 5).map(d => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon
    };
  });

  return { timezone, daily };
};

const getFormattedWeatherData = async searchParams => {
  const formattedCurrentWeather = await getWeatherData("weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current, minutely, hourly, alerts",
    units: searchParams.units
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (
  secs,
  zone,
  format
) =>
  DateTime.fromSeconds(secs)
          .setZone(zone)
          .toFormat(format);

const iconCode = code => `${code}`;

const WeatherIcons = {
  "01d": "/icons/clear-sky.svg",
  "01n": "/icons/clear-sky-night.svg",
  "02d": "/icons/few-clouds.svg",
  "02n": "/icons/few-clouds-night.svg",
  "03d": "/icons/scattered-clouds.svg",
  "03n": "/icons/scattered-clouds.svg",
  "04d": "/icons/broken-clouds.svg",
  "04n": "/icons/broken-clouds.svg",
  "09d": "/icons/shower-rain.svg",
  "09n": "/icons/shower-rain.svg",
  "10d": "/icons/rain.svg",
  "10n": "/icons/rain-night.svg",
  "11d": "/icons/thunderstorm.svg",
  "11n": "/icons/thunderstorm.svg",
  "13d": "/icons/snow.svg",
  "13n": "/icons/snow.svg",
  "50d": "/icons/mist.svg",
  "50n": "/icons/mist.svg"
};

export default getFormattedWeatherData;

export { formatToLocalTime, iconCode, WeatherIcons };
