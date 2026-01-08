console.log("Script loaded successfully");
console.log("Script loaded successfully");

// DOM elements
const viewSelect = document.getElementById("view");
const timeSelect = document.getElementById("time");
const metricSpan = document.getElementById("metric");

let chart;

// calculate derived metric
function calculateMetric() {
  if (!ordersData.length || !callsData.length) {
    metricSpan.textContent = "0%";
    return;
  }

  const totalOrders = ordersData.length;
  const totalCalls = callsData.length;

  const conversion = ((totalOrders / totalCalls) * 100).toFixed(2);
  metricSpan.textContent = conversion + "%";
}

// draw bar chart
function drawChart() {
  const ctx = document.getElementById("chart").getContext("2d");

  const labels = ["Orders", "Calls"];
  const values = [ordersData.length, callsData.length];

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Count",
        data: values,
        backgroundColor: ["#4CAF50", "#2196F3"]
      }]
    }
  });
}

// initial load
calculateMetric();
drawChart();

// dropdown change listeners
viewSelect.addEventListener("change", () => {
  calculateMetric();
  drawChart();
});

timeSelect.addEventListener("change", () => {
  calculateMetric();
  drawChart();
});
