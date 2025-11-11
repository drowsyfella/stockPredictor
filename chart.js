// ===================================
// CHART FUNCTIONALITY WITH CHART.JS
// ===================================

let chartInstance = null;
let currentTimeRange = '1M';

// ===================================
// CHART INITIALIZATION
// ===================================

/**
 * Initialize the price chart with historical and prediction data
 * @param {Array} historicalData - Array of {date, price, volume} objects
 * @param {Object} predictions - Prediction object with day7, day30, day90
 * @param {string} timeRange - Time range to display (1D, 5D, 1M, 3M, 6M, 1Y, 5Y)
 */
function initializeChart(historicalData, predictions, timeRange = '1M') {
    currentTimeRange = timeRange;
    
    // Filter data based on time range
    const filteredData = filterDataByTimeRange(historicalData, timeRange);
    
    // Create the chart
    createPriceChart(filteredData, predictions);
    
    // Setup time range selector buttons
    setupTimeRangeButtons();
}

/**
 * Filter historical data based on selected time range
 * @param {Array} data - Full historical data
 * @param {string} range - Time range
 * @returns {Array} Filtered data
 */
function filterDataByTimeRange(data, range) {
    let days;
    switch(range) {
        case '1D': days = 1; break;
        case '5D': days = 5; break;
        case '1M': days = 30; break;
        case '3M': days = 90; break;
        case '6M': days = 180; break;
        case '1Y': days = 365; break;
        case '5Y': days = 1825; break;
        default: days = 30;
    }
    
    return data.slice(-days);
}

/**
 * Create the Chart.js price chart
 * @param {Array} historicalData - Filtered historical data
 * @param {Object} predictions - Prediction data
 */
function createPriceChart(historicalData, predictions) {
    const ctx = document.getElementById('priceChart').getContext('2d');
    
    // Destroy existing chart if any
    if (chartInstance) {
        chartInstance.destroy();
    }
    
    // Prepare historical data
    const dates = historicalData.map(d => formatDate(d.date));
    const prices = historicalData.map(d => d.price);
    
    // Determine if price increased or decreased overall
    const firstPrice = prices[0];
    const lastPrice = prices[prices.length - 1];
    const isPriceIncreased = lastPrice >= firstPrice;
    
    // Prepare prediction data
    const lastDate = historicalData[historicalData.length - 1].date;
    const predictionDates = [
        formatDate(lastDate),
        formatDate(addDays(lastDate, 7)),
        formatDate(addDays(lastDate, 30)),
        formatDate(addDays(lastDate, 90))
    ];
    
    const predictionPrices = [
        prices[prices.length - 1],
        predictions.day7,
        predictions.day30,
        predictions.day90
    ];
    
    // Combine dates for x-axis
    const allDates = [...dates, ...predictionDates.slice(1)];
    
    // Create datasets with dynamic color based on price movement
    const lineColor = isPriceIncreased ? '#10B981' : '#EF4444'; // Green if up, Red if down
    const fillColor = isPriceIncreased ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';
    
    const datasets = [
        {
            label: 'Actual Price',
            data: [...prices, null, null, null],
            borderColor: lineColor,
            backgroundColor: fillColor,
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: lineColor,
            pointHoverBorderColor: '#FFFFFF',
            pointHoverBorderWidth: 2
        },
        {
            label: 'Predicted Price',
            data: [...Array(prices.length - 1).fill(null), ...predictionPrices],
            borderColor: '#F59E0B',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            borderWidth: 2,
            borderDash: [5, 5],
            tension: 0.4,
            fill: false,
            pointRadius: 4,
            pointBackgroundColor: '#F59E0B',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            pointHoverRadius: 6
        }
    ];
    
    // Chart configuration
    const config = {
        type: 'line',
        data: {
            labels: allDates,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Inter',
                            size: 12
                        },
                        color: '#9CA3AF',
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: '#0F172A',
                    titleColor: '#FFFFFF',
                    bodyColor: '#FFFFFF',
                    borderColor: '#1E293B',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        title: function(context) {
                            return context[0].label;
                        },
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const value = context.parsed.y;
                            if (value === null) return '';
                            return `${label}: $${value.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: true,
                        color: 'rgba(148, 163, 184, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 11
                        },
                        color: '#64748B',
                        maxRotation: 0,
                        minRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 12
                    }
                },
                y: {
                    grid: {
                        display: true,
                        color: 'rgba(148, 163, 184, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 11
                        },
                        color: '#64748B',
                        callback: function(value) {
                            return '$' + value.toFixed(0);
                        },
                        padding: 10
                    }
                }
            }
        }
    };
    
    // Create chart
    chartInstance = new Chart(ctx, config);
}

// ===================================
// TIME RANGE SELECTOR
// ===================================

/**
 * Setup event listeners for time range buttons
 */
function setupTimeRangeButtons() {
    const buttons = document.querySelectorAll('.time-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const range = button.dataset.range;
            
            // Update active state
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update chart
            updateChartTimeRange(range);
        });
    });
}

/**
 * Update chart when time range changes
 * @param {string} range - New time range
 */
function updateChartTimeRange(range) {
    currentTimeRange = range;
    
    if (!currentHistoricalData || !currentPredictions) {
        console.error('No data available to update chart');
        return;
    }
    
    const filteredData = filterDataByTimeRange(currentHistoricalData, range);
    createPriceChart(filteredData, currentPredictions);
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    
    // Add year if not current year
    const currentYear = new Date().getFullYear();
    if (date.getFullYear() !== currentYear) {
        options.year = 'numeric';
    }
    
    return date.toLocaleDateString('en-US', options);
}

/**
 * Add days to a date string
 * @param {string} dateString - ISO date string
 * @param {number} days - Number of days to add
 * @returns {string} New ISO date string
 */
function addDays(dateString, days) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
}

/**
 * Prepare candlestick data from historical prices
 * @param {Array} historicalData - Array of {date, price, volume} objects
 * @returns {Array} Candlestick data with OHLC values
 */
function prepareCandlestickData(historicalData) {
    return historicalData.map((item, index) => {
        const price = item.price;
        // Simulate OHLC from single price point with realistic variation
        const variation = price * 0.015; // 1.5% variation
        const open = index > 0 ? historicalData[index - 1].price : price;
        const close = price;
        const high = Math.max(open, close) + (Math.random() * variation);
        const low = Math.min(open, close) - (Math.random() * variation);
        
        return {
            x: item.date,
            o: open,
            h: high,
            l: low,
            c: close,
            y: close // For bar chart, use close as y value
        };
    });
}

/**
 * Update chart with new data (for real-time updates)
 * @param {Array} newData - New historical data
 * @param {Object} newPredictions - New predictions
 */
function updateChart(newData, newPredictions) {
    currentHistoricalData = newData;
    currentPredictions = newPredictions;
    
    const filteredData = filterDataByTimeRange(newData, currentTimeRange);
    createPriceChart(filteredData, newPredictions);
}

/**
 * Destroy chart instance (cleanup)
 */
function destroyChart() {
    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
    }
}

// ===================================
// CHART ANIMATIONS
// ===================================

/**
 * Animate chart on load
 */
function animateChartOnLoad() {
    if (chartInstance) {
        chartInstance.options.animation = {
            duration: 1000,
            easing: 'easeInOutQuart'
        };
        chartInstance.update();
    }
}

// ===================================
// RESPONSIVE CHART HANDLING
// ===================================

/**
 * Handle window resize for chart responsiveness
 */
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (chartInstance) {
            chartInstance.resize();
        }
    }, 250);
});

// ===================================
// EXPORT FOR GLOBAL ACCESS
// ===================================

if (typeof window !== 'undefined') {
    window.initializeChart = initializeChart;
    window.updateChart = updateChart;
    window.destroyChart = destroyChart;
    window.updateChartTimeRange = updateChartTimeRange;
}
