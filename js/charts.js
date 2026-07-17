// CredAI - Charting Utilities (Wraps Chart.js)

let cashFlowChartInstance = null;
let shapChartInstance = null;
let forecastChartInstance = null;
let repaymentChartInstance = null;

// Helper to destroy previous instance to prevent layout overlap/leak
function destroyChart(instance) {
  if (instance) {
    instance.destroy();
  }
}

// 1. Render Cash Flow Inflow vs Outflow over last 6 months
export function renderCashFlowChart(ctx, transactions) {
  destroyChart(cashFlowChartInstance);
  
  // Aggregate transactions by month
  const monthlyData = aggregateMonthlyData(transactions);
  
  cashFlowChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: monthlyData.labels,
      datasets: [
        {
          label: 'Inflows (Deposits)',
          data: monthlyData.inflows,
          backgroundColor: 'rgba(45, 212, 191, 0.65)',
          borderColor: 'rgb(45, 212, 191)',
          borderWidth: 1.5,
          borderRadius: 4
        },
        {
          label: 'Outflows (Withdrawals)',
          data: monthlyData.outflows,
          backgroundColor: 'rgba(244, 63, 94, 0.45)',
          borderColor: 'rgb(244, 63, 94)',
          borderWidth: 1.5,
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: '#94a3b8', font: { family: 'Inter' } }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ₹${context.raw.toLocaleString('en-IN')}`;
            }
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#64748b' } },
        y: { 
          grid: { color: 'rgba(255,255,255,0.05)' }, 
          ticks: { 
            color: '#64748b',
            callback: (val) => '₹' + (val >= 1000 ? (val / 1000) + 'k' : val)
          } 
        }
      }
    }
  });
}

// 2. Render AI Attribution SHAP Chart (Bar chart showing + / - contributors)
export function renderShapChart(ctx, shapWeights) {
  destroyChart(shapChartInstance);
  
  const labels = shapWeights.map(w => w.feature);
  const data = shapWeights.map(w => w.val);
  const colors = data.map(v => v >= 0 ? 'rgba(45, 212, 191, 0.7)' : 'rgba(244, 63, 94, 0.7)');
  const borderColors = data.map(v => v >= 0 ? 'rgb(45, 212, 191)' : 'rgb(244, 63, 94)');
  
  shapChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Score Contribution (relative to baseline)',
        data: data,
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1.5,
        borderRadius: 4
      }]
    },
    options: {
      indexAxis: 'y', // Horizontal bar chart
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              const prefix = context.raw >= 0 ? '+' : '';
              return `Contribution: ${prefix}${context.raw} points`;
            }
          }
        }
      },
      scales: {
        x: { 
          grid: { color: 'rgba(255,255,255,0.05)' }, 
          ticks: { color: '#64748b' },
          suggestedMin: -80,
          suggestedMax: 80
        },
        y: { grid: { display: false }, ticks: { color: '#94a3b8' } }
      }
    }
  });
}

// 3. Render Cash Flow Forecast Chart (Historical + Baseline vs Stressed Forecast)
export function renderForecastChart(ctx, transactions, revenueShock = 0) {
  destroyChart(forecastChartInstance);
  
  const monthlyData = aggregateMonthlyData(transactions);
  
  // Historical inflows (last 4 months)
  const histLabels = monthlyData.labels.slice(-4);
  const histInflows = monthlyData.inflows.slice(-4);
  
  // Forecast 3 months forward
  const avgInflow = histInflows.reduce((a, b) => a + b, 0) / histInflows.length;
  
  const forecastLabels = [...histLabels, 'Month +1 (Proj)', 'Month +2 (Proj)', 'Month +3 (Proj)'];
  
  const baselineInflowLine = [...histInflows, avgInflow, avgInflow * 1.02, avgInflow * 1.05];
  const stressedInflowLine = [...histInflows, avgInflow * (1 - revenueShock/100), avgInflow * (1 - revenueShock/100) * 0.98, avgInflow * (1 - revenueShock/100) * 0.95];
  
  forecastChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: forecastLabels,
      datasets: [
        {
          label: 'Historical Inflow',
          data: [...histInflows, null, null, null],
          borderColor: 'rgba(99, 102, 241, 0.8)',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          fill: true,
          tension: 0.3,
          borderWidth: 3
        },
        {
          label: 'Baseline Forecast',
          data: [...Array(histInflows.length - 1).fill(null), histInflows[histInflows.length - 1], ...baselineInflowLine.slice(histInflows.length)],
          borderColor: 'rgba(45, 212, 191, 0.9)',
          borderDash: [5, 5],
          tension: 0.3,
          borderWidth: 2,
          pointStyle: 'circle'
        },
        {
          label: 'Stressed Forecast',
          data: [...Array(histInflows.length - 1).fill(null), histInflows[histInflows.length - 1], ...stressedInflowLine.slice(histInflows.length)],
          borderColor: 'rgba(244, 63, 94, 0.9)',
          borderDash: [5, 5],
          tension: 0.3,
          borderWidth: 2,
          pointStyle: 'crossRot'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#94a3b8' } }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#64748b' } },
        y: { 
          grid: { color: 'rgba(255,255,255,0.05)' }, 
          ticks: { 
            color: '#64748b',
            callback: (val) => '₹' + (val / 1000) + 'k'
          } 
        }
      }
    }
  });
}

// 4. Repayment comparison chart: EMI stair-step vs Daily smooth siphoning
export function renderRepaymentChart(ctx, loanAmount, tenureMonths, interestRate) {
  destroyChart(repaymentChartInstance);
  
  // Calculate total repayment with simple interest
  const totalRepayable = loanAmount * (1 + (interestRate / 100) * (tenureMonths / 12));
  
  const totalDays = tenureMonths * 30;
  const labels = [];
  const emiLine = [];
  const siphoningLine = [];
  
  // Generate data points for every 5 days
  const emiAmount = totalRepayable / tenureMonths;
  const dailySiphonRate = totalRepayable / totalDays;
  
  let currentEmiBal = totalRepayable;
  let currentSiphonBal = totalRepayable;
  
  for (let day = 0; day <= totalDays; day += 10) {
    labels.push(`Day ${day}`);
    
    // Monthly EMI drop
    if (day > 0 && day % 30 === 0) {
      currentEmiBal = Math.max(0, currentEmiBal - emiAmount);
    }
    emiLine.push(Math.round(currentEmiBal));
    
    // Daily smooth siphoning
    currentSiphonBal = Math.max(0, totalRepayable - (day * dailySiphonRate));
    siphoningLine.push(Math.round(currentSiphonBal));
  }
  
  repaymentChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Traditional Monthly EMI (Stair-step)',
          data: emiLine,
          borderColor: 'rgba(99, 102, 241, 0.85)',
          borderWidth: 2,
          stepped: true,
          fill: false,
          pointRadius: 0
        },
        {
          label: 'Daily UPI QR Siphoning (Smooth)',
          data: siphoningLine,
          borderColor: 'rgba(45, 212, 191, 0.95)',
          borderWidth: 2.5,
          fill: false,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#94a3b8' } }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#64748b' } },
        y: { 
          grid: { color: 'rgba(255,255,255,0.05)' }, 
          ticks: { 
            color: '#64748b',
            callback: (val) => '₹' + (val / 1000) + 'k'
          } 
        }
      }
    }
  });
}

// Private Helper: Aggregate transactions into 6 monthly buckets
function aggregateMonthlyData(transactions) {
  const months = {};
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  // Initialize last 6 months buckets
  const currentDate = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = `${monthNames[d.getMonth()]} ${String(d.getFullYear()).slice(-2)}`;
    months[key] = { label, inflow: 0, outflow: 0 };
  }
  
  // Distribute transactions
  transactions.forEach(tx => {
    const key = tx.date.slice(0, 7); // YYYY-MM
    if (months[key]) {
      if (tx.type === "Deposit") {
        months[key].inflow += tx.amount;
      } else {
        months[key].outflow += tx.amount;
      }
    }
  });
  
  const labels = [];
  const inflows = [];
  const outflows = [];
  
  Object.keys(months).forEach(k => {
    labels.push(months[k].label);
    inflows.push(Math.round(months[k].inflow));
    outflows.push(Math.round(months[k].outflow));
  });
  
  return { labels, inflows, outflows };
}
