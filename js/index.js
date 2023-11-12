import { renderChart } from "./charts.js";
import { renderTable } from "./table.js";
import { storeTemperatureLocally } from "./util.js";

// OpenWeatherMap API configuration
const API_KEY = "90cce5b358da18ccae6aabe40058cfed";
const API_END_POINT = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;

// Function to display error message
const showError = (errorMsg) => {
  const errorEl = document.getElementById("error");
  if (errorEl) {
    errorEl.innerHTML = errorMsg;
  }
};

// Asynchronous function to fetch weather data from the API
async function getWeatherData(city) {
  try {
    // Clear any previous error messages
    showError("");

    // Fetch weather data
    const res = await fetch(`${API_END_POINT}&q=${city}&units=metric`);
    const data = await res.json();

    // Check if the API response contains an error message
    if (data.cod !== 200 && data.message) {
      showError(data.message);
    } else {
      // Display current temperature, store it locally, and update table and chart
      displayCurrentTemperature(data.main.temp);
      storeTemperatureLocally(data.main.temp, Date.now());
      displayDataInTableAndChart();
    }
  } catch (err) {
    // Handle any unexpected errors
    showError("Something went wrong");
  }
}

// Function to display data in both the table and the chart
function displayDataInTableAndChart() {
  renderTable();
  renderChart();
}

// Function to display the current temperature in the UI
function displayCurrentTemperature(temperature) {
  document.getElementById("currentTemp").innerHTML = `${temperature}°C`;
}

// Function to check temperature periodically for a specified city
function checkTemperaturePeriodically(cityName) {
  // Initial data fetch
  getWeatherData(cityName);

  // Set up periodic data fetch using setInterval
  setInterval(() => {
    getWeatherData(cityName);
  }, 10000);
}

// Initial call to check temperature periodically for the city "London"
checkTemperaturePeriodically("London");

