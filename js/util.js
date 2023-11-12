const getStoredTemperatures = () =>
  JSON.parse(localStorage.getItem("temperatures")) || [];

// Function to store the temperature locally
function storeTemperatureLocally(temperature, timestamp) {
  // Get the existing stored temperatures from local storage
  let storedTemperatures = getStoredTemperatures();

  // Create a new Date object
  const date = new Date();

  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  console.log(storedTemperatures, timestamp, formattedDate, date.getTime());
  // Add the new temperature to the array
  storedTemperatures.push({
    temperature,
    timestamp,
  });

  // Keep only the last 100 temperatures
  if (storedTemperatures.length > 100) {
    storedTemperatures.splice(0, 1);
  }

  // Save the updated array back to local storage
  localStorage.setItem("temperatures", JSON.stringify(storedTemperatures));
}

export { getStoredTemperatures, storeTemperatureLocally };
