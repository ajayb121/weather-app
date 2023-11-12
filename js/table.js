import { getStoredTemperatures } from "./util.js";

// Function to render temperature data in a table
const renderTable = () => {
  // Get the table body element
  const tableBody = document
    .getElementById("temperatureTable")
    .getElementsByTagName("tbody")[0];

  // Get the stored temperature data
  const data = getStoredTemperatures();

  // Clear the table
  tableBody.innerHTML = '';

  // Iterate through each stored temperature data entry
  data.forEach(({ temperature, timestamp }) => {
    // Create a new row in the table
    const row = tableBody.insertRow(0);

    // Create cells for datetime and temperature
    const cellDateTime = row.insertCell(0);
    const cellTemperature = row.insertCell(1);

    // Format timestamp as a readable date and time
    const formattedDateTime = new Date(timestamp).toLocaleString();

    // Update table cells with formatted datetime and temperature
    cellDateTime.textContent = formattedDateTime;
    cellTemperature.textContent = `${temperature}°C`;
  });
}

export {
  renderTable
}