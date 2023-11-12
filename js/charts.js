import { getStoredTemperatures } from "./util.js";

let tempChart = null;

const getData = () => {
  const val = getStoredTemperatures().map((el) => {
    const date = new Date(el.timestamp);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return {
      y: el.temperature,
      x: formattedDate,
    };
  });
  return val;
};

const renderChart = () => {
  const ctx = document.getElementById("myChart");
  if (tempChart) {
    tempChart.destroy();
  }

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
