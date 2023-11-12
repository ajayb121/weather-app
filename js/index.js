import { renderChart } from "./charts.js";
import { renderTable } from "./table.js";
import { storeTemperatureLocally } from "./util.js";

const API_KEY = "90cce5b358da18ccae6aabe40058cfed";
const API_END_POINT = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;

const showError = (errorMsg) => {
  const errorEl = document.getElementById("error");
  if (errorEl) {
    errorEl.innerHTML = errorMsg;
  }
};

async function getWeatherData(city) {
  try {
    showError("");
    const res = await fetch(`${API_END_POINT}&q=${city}&units=metric`);
    const data = await res.json();
    if (data.cod !== 200 && data.message) {
      showError(data.message);
    } else {
      displayCurrentTemperature(data.main.temp);
      storeTemperatureLocally(data.main.temp, Date.now());
      displayDataInTableAndChart();
    }
  } catch (err) {
    showError("Something went wrong");
  }
}

function displayDataInTableAndChart() {
  renderTable();
  renderChart();
}

function displayCurrentTemperature(temperature) {
  document.getElementById("currentTemp").innerHTML = `${temperature}°C`;
}

let intervalId = "";

function checkTemperaturePeriodically(cityName) {
  getWeatherData(cityName);

  intervalId = setInterval(() => {
    getWeatherData(cityName);
  }, 10000);
}

checkTemperaturePeriodically("london");

