import { getStoredTemperatures } from "./util.js";

const renderTable = () => {
  const tableBody = document
    .getElementById("temperatureTable")
    .getElementsByTagName("tbody")[0];

  const data = getStoredTemperatures();

  // Clear the table
  tableBody.innerHTML = '';

  data.forEach(({ temperature, timestamp }) => {
    const row = tableBody.insertRow(0);
    const cellDateTime = row.insertCell(0);
    const cellTemperature = row.insertCell(1);

    // Format timestamp as a readable date and time
    const formattedDateTime = new Date(timestamp).toLocaleString();

    // Update table cells
    cellDateTime.textContent = formattedDateTime;
    cellTemperature.textContent = `${temperature}°C`;
  });
}

export {
  renderTable
}