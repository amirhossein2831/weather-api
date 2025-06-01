async function fetchLocation() {
  const res = await fetch(LOCATION_BASE_URL);
  if (!res.ok) throw new Error(LOCATION_FAILED_ERROR);
  return res.json();
}

function renderLocation(location, target) {
  target.innerHTML = `
    <strong>IP:</strong> ${location.ip} <br>
    <strong>City:</strong> ${location.city} <br>
    <strong>Region:</strong> ${location.region} <br>
    <strong>Country:</strong> ${location.country_name}
  `;
}
