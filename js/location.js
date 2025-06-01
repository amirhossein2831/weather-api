async function fetchLocation() {
  const res = await fetch(LOCATION_BASE_URL);
  if (!res.ok) throw new Error(LOCATION_FAILED_ERROR);
  return res.json();
}
