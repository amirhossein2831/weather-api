async function fetchCurrentWeather(query) {
    const res = await fetch(`${WEATHER_BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${query}&lang=${DEFAULT_LANGUAGE}`);
    if (!res.ok) throw new Error(CURRENT_WEATHER_FAILED_ERROR);
    return res.json();
}

async function fetchWeatherForecast(query, days = 7) {
    const res = await fetch(`${WEATHER_BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${query}&days=${days}&lang=${DEFAULT_LANGUAGE}`);
    if (!res.ok) throw new Error(FUTURE_WEATHER_FAILED_ERROR);
    return res.json();
}

function renderCurrentWeather(data, target) {
    const current = data.current;
    const location = data.location;

    target.innerHTML = `
    <h3>Current Weather for ${location.name}, ${location.region}</h3>
    <p><strong>Temperature:</strong> ${current.temp_c}°C / ${current.temp_f}°F</p>
    <p><strong>Condition:</strong> ${current.condition.text} <img src="https:${current.condition.icon}" alt="weather icon"></p>
    <p><strong>Humidity:</strong> ${current.humidity}%</p>
    <p><strong>Wind:</strong> ${current.wind_kph} kph (${current.wind_dir})</p>
    <p><strong>Last updated:</strong> ${current.last_updated}</p>
  `;
}

function renderForecastWeather(data, target) {
    const forecastDays = data.forecast.forecastday;
    let forecastHTML = '<h3>7-Day Weather Forecast</h3>';

    forecastDays.forEach(day => {
        forecastHTML += `
      <div class="forecast-day" style="margin-bottom: 1em; border-bottom: 1px solid #ccc; padding-bottom: 1em;">
        <strong>${day.date}</strong><br>
        <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" style="vertical-align: middle;">
        <span>${day.day.condition.text}</span><br>
        <span>Max: ${day.day.maxtemp_c}°C / ${day.day.maxtemp_f}°F</span><br>
        <span>Min: ${day.day.mintemp_c}°C / ${day.day.mintemp_f}°F</span><br>
        <span>Chance of rain: ${day.day.daily_chance_of_rain}%</span><br>
        <span>UV Index: ${day.day.uv}</span>
      </div>
    `;
    });

    target.innerHTML = forecastHTML;
}
