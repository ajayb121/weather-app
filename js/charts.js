import { getStoredTemperatures } from "./util.js";

// Variable to store the Chart instance
let tempChart = null;

// Function to transform stored temperature data into a format suitable for Chart.js
const getData = () => {
  const val = getStoredTemperatures().map((el) => {
    // Convert timestamp to a formatted date string
    const date = new Date(el.timestamp);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    // Return a formatted data point for Chart.js
    return {
      y: el.temperature,
      x: formattedDate,
    };
  });
  return val;
};

// Function to render or update the Chart using Chart.js
const renderChart = () => {
  // Get the canvas element by ID
  const ctx = document.getElementById("myChart");

  // If a previous chart instance exists, destroy it
  if (tempChart) {
    tempChart.destroy();
  }

  // Create a new Chart instance
  tempChart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Temperature(°C)",
          data: getData(), 
        },
      ],
    },
    options: {
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Datetime",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Temperature(°C)",
          },
        },
      },
    },
  });
};

export { renderChart };
