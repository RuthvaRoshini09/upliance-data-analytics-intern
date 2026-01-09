console.log("Script loaded successfully");

// DOM elements
const viewSelect = document.getElementById("view");
const timeSelect = document.getElementById("time");
const metricSpan = document.getElementById("metric");

let chart;

// calculate derived metric (Orders / Calls)
function calculateMetric() {
    if (viewSelect.value === "sessions") {
  metricSpan.textContent = "N/A";
  return;
}

  if (!data.orders.length || !data.calls.length) {
    metricSpan.textContent = "0%";
    return;
  }

  const totalOrders = data.orders.reduce((sum, o) => sum + o.count, 0);
  const totalCalls = data.calls.reduce((sum, c) => sum + c.count, 0);


  const conversion = ((totalOrders / totalCalls) * 100).toFixed(2);
  metricSpan.textContent = conversion + "%";
}
function groupByTime(dataArray, time) {
  if (time === "daily") {
    return {
      labels: dataArray.map(d => d.date),
      values: dataArray.map(d => d.count)
    };
  }

  const total = dataArray.reduce((sum, d) => sum + d.count, 0);

  if (time === "weekly") {
    return {
      labels: ["This Week"],
      values: [total]
    };
  }

  if (time === "monthly") {
    return {
      labels: ["This Month"],
      values: [total]
    };
  }
}


// draw bar chart based on selected view
function drawChart() {
  const ctx = document.getElementById("chart").getContext("2d");

  let selectedData = [];
  let label = "";
  let color = "";

  if (viewSelect.value === "orders") {
    selectedData = data.orders;
    label = "ORDERS";
    color = "#4CAF50";
  } else if (viewSelect.value === "calls") {
    selectedData = data.calls;
    label = "CALLS";
    color = "#2196F3";
  } else {
    selectedData = data.sessions;
    label = "SESSIONS";
    color = "#FF9800";
  }

  const labels = selectedData.map(item => item.date);
  const values = selectedData.map(item => item.count);

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: values,
        backgroundColor: color
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
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
