// Function to get stored temperatures from local storage
const getStoredTemperatures = () =>
  JSON.parse(localStorage.getItem("temperatures")) || [];

// Function to store the temperature locally
function storeTemperatureLocally(temperature, timestamp) {
  // Get the existing stored temperatures from local storage
  let storedTemperatures = getStoredTemperatures();

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
