// main.js
const locationDiv = document.querySelector('.location-container');
const currentWeather = document.querySelector('.weather-current-container');
const futureWeather = document.querySelector('.weather-future-container');

fetchLocation()
  .then(location => {
    renderLocation(location, locationDiv);
    const query = `${location.latitude},${location.longitude}`;
    return query;
  })
  .then(async query => {
    const data = await fetchCurrentWeather(query);
    renderCurrentWeather(data, currentWeather);
    return query;
  })
  .then(async query => {
    const data = await fetchWeatherForecast(query, 7);
    renderForecastWeather(data, futureWeather);
  })
  .catch(err => {
    handleError(err, { locationDiv, currentWeather, futureWeather });
  });
