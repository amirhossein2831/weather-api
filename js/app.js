const locationDiv = document.querySelector('.location-container');
const currentWeather = document.querySelector('.weather-current-container');
const futureWeather = document.querySelector('.weather-future-container');
const manualInputContainer = document.querySelector('.manual-location');
const manualInput = document.getElementById('manual-location-input');
const applyButton = document.getElementById('apply-location');
const errorContainer = document.querySelector(".error-container");

showLoading();
fetchLocation()
  .then(location => {
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
    hideLoading();
  })
  .catch(err => {
    hideLoading();
    currentWeather.style.visibility = 'hidden';
    errorContainer.innerHTML = "<strong>Failed to fetch your location</strong>";
    manualInputContainer.style.display = 'block';
  });

applyButton.addEventListener('click', async () => {
  const city = manualInput.value.trim();
  if (!city) return alert("Please enter a city name");
  errorContainer.innerHTML = "";
  showLoading();
  try {
    const currentData = await fetchCurrentWeather(city);
    renderCurrentWeather(currentData, currentWeather);

    const forecastData = await fetchWeatherForecast(city, 7);
    renderForecastWeather(forecastData, futureWeather);
    currentWeather.style.visibility = 'visible';

    manualInputContainer.style.display = 'none'; // hide after success
    hideLoading();
  } catch (err) {
    currentWeather.style.display = 'none';
    errorContainer.innerHTML = "<strong>Failed to fetch weather</strong>";
    hideLoading()
  }
});