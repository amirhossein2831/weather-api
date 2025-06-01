function handleError(err, { locationDiv, currentWeather, futureWeather }) {

    if (err.message === LOCATION_FAILED_ERROR) {
        locationDiv.innerHTML = `<strong>${err.message}</strong>`;
    } else if (err.message === CURRENT_WEATHER_FAILED_ERROR) {
        currentWeather.innerHTML = `<strong>${err.message}</strong>`;
    } else if (err.message === FUTURE_WEATHER_FAILED_ERROR) {
        futureWeather.innerHTML = `<strong>${err.message}</strong>`;
    } else {
        locationDiv.innerHTML = "<strong>Unknown error occurred</strong>";
        currentWeather.innerHTML = "<strong>Unknown error occurred</strong>";
        futureWeather.innerHTML = "<strong>Unknown error occurred</strong>";
    }

    console.error('Error:', err.message);
}