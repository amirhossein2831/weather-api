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
      <div class="current-weather-header">
        <div>
          <h2>${location.name}, ${location.country}</h2>
          <p class="current-date">${new Date(current.last_updated).toLocaleDateString()}</p>
        </div>
        <div class="current-temp">${current.temp_c}°C</div>
      </div>
      
      <div class="current-condition">
        <i class="wi ${getWeatherIcon(current.condition.code, current.is_day)}"></i>
        <span>${current.condition.text}</span>
      </div>
      
      <div class="weather-details">
        <div class="detail-item">
          <i class="wi wi-humidity"></i>
          <span>Humidity: ${current.humidity}%</span>
        </div>
        <div class="detail-item">
          <i class="wi wi-strong-wind"></i>
          <span>Wind: ${current.wind_kph} km/h ${current.wind_dir}</span>
        </div>
        <div class="detail-item">
          <i class="wi wi-barometer"></i>
          <span>Pressure: ${current.pressure_mb} hPa</span>
        </div>
        <div class="detail-item">
          <i class="wi wi-raindrop"></i>
          <span>Precip: ${current.precip_mm} mm</span>
        </div>
        <div class="detail-item">
          <i class="wi wi-day-sunny"></i>
          <span>UV Index: ${current.uv}</span>
        </div>
        <div class="detail-item">
          <i class="wi wi-cloudy"></i>
          <span>Cloud: ${current.cloud}%</span>
        </div>
      </div>
    `;
}

function renderForecastWeather(data, target) {
    const forecastDays = data.forecast.forecastday;
    let forecastHTML = '';
    
    forecastDays.forEach(day => {
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString('en', { weekday: 'short' });
        
        forecastHTML += `
          <div class="forecast-day">
            <div class="forecast-date">${dayName}, ${date.getDate()}</div>
            <i class="wi ${getWeatherIcon(day.day.condition.code)}"></i>
            <div class="forecast-temp">
              <span class="forecast-temp-max">${day.day.maxtemp_c}°</span>
              <span class="forecast-temp-min">${day.day.mintemp_c}°</span>
            </div>
            <div class="forecast-details">
              <div>${day.day.condition.text}</div>
              <div><i class="wi wi-raindrop"></i> ${day.day.daily_chance_of_rain}%</div>
              <div>UV: ${day.day.uv}</div>
            </div>
          </div>
        `;
    });
    
    target.innerHTML = forecastHTML;
}

// Helper function to map weather codes to Weather Icons
function getWeatherIcon(code, isDay = 1) {
    const iconMap = {
        1000: isDay ? 'wi-day-sunny' : 'wi-night-clear',
        1003: isDay ? 'wi-day-cloudy' : 'wi-night-alt-cloudy',
        1006: 'wi-cloudy',
        1009: 'wi-cloudy',
        1030: 'wi-fog',
        1063: isDay ? 'wi-day-rain' : 'wi-night-alt-rain',
        1066: isDay ? 'wi-day-snow' : 'wi-night-alt-snow',
        1069: 'wi-sleet',
        1072: 'wi-sleet',
        1087: 'wi-thunderstorm',
        1114: 'wi-snow-wind',
        1117: 'wi-snow-wind',
        1135: 'wi-fog',
        1147: 'wi-fog',
        1150: 'wi-sprinkle',
        1153: 'wi-sprinkle',
        1168: 'wi-sleet',
        1171: 'wi-sleet',
        1180: isDay ? 'wi-day-showers' : 'wi-night-alt-showers',
        1183: 'wi-sprinkle',
        1186: isDay ? 'wi-day-rain' : 'wi-night-alt-rain',
        1189: 'wi-rain',
        1192: 'wi-rain',
        1195: 'wi-rain',
        1198: 'wi-sleet',
        1201: 'wi-sleet',
        1204: 'wi-sleet',
        1207: 'wi-sleet',
        1210: isDay ? 'wi-day-snow' : 'wi-night-alt-snow',
        1213: 'wi-snow',
        1216: 'wi-snow',
        1219: 'wi-snow',
        1222: 'wi-snow',
        1225: 'wi-snow',
        1237: 'wi-hail',
        1240: isDay ? 'wi-day-showers' : 'wi-night-alt-showers',
        1243: 'wi-showers',
        1246: 'wi-rain-wind',
        1249: 'wi-sleet',
        1252: 'wi-sleet',
        1255: 'wi-snow',
        1258: 'wi-snow',
        1261: 'wi-hail',
        1264: 'wi-hail',
        1273: isDay ? 'wi-day-thunderstorm' : 'wi-night-alt-thunderstorm',
        1276: 'wi-thunderstorm',
        1279: isDay ? 'wi-day-snow-thunderstorm' : 'wi-night-alt-snow-thunderstorm',
        1282: 'wi-snow-thunderstorm'
    };
    
    return iconMap[code] || 'wi-day-cloudy';
}