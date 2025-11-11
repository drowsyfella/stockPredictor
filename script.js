// ===================================
// GLOBAL STATE & CONFIGURATION
// ===================================

// Stock Data API Configuration
// Using Yahoo Finance API for real-time stock data
// Currently using demo data - Yahoo Finance API integration pending

const USE_YAHOO_API = false; // Set to true when Yahoo Finance API is configured
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const DEBOUNCE_DELAY = 300; // 300ms

// Cache storage
const cache = new Map();

// Global state
let allStocks = [];
let currentStock = null;
let currentHistoricalData = [];
let currentPredictions = null;
let searchTimeout = null;

// ===================================
// DEMO DATA - Loaded from demo-data.js
// ===================================
// MOCK_STOCKS is defined in demo-data.js and includes:
// - 30 famous US stocks (AAPL, MSFT, GOOGL, etc.)
// - 5 major Forex pairs (EUR/USD, GBP/USD, etc.)
// - 5 major Cryptocurrencies (BTC, ETH, BNB, etc.)
// The demo-data.js file is loaded before this script in index.html

// ===================================
// DOM ELEMENTS
// ===================================

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchSection = document.getElementById('searchSection');
const stockSection = document.getElementById('stockSection');
const skeletonLoader = document.getElementById('skeletonLoader');
const stockContent = document.getElementById('stockContent');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const errorClose = document.getElementById('errorClose');

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Initializing Stock Predictor...');
    
    // Load all stocks for search
    await loadAllStocks();
    
    // Setup event listeners
    setupEventListeners();
    
    console.log('App initialized successfully');
});

// ===================================
// EVENT LISTENERS
// ===================================

function setupEventListeners() {
    // Search input with debounce
    searchInput.addEventListener('input', handleSearchInput);
    
    // Click outside to close search results
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
    
    // Error message close button
    errorClose.addEventListener('click', hideErrorMessage);
    
    // Auto-hide error after 5 seconds
    let errorTimeout;
    const observer = new MutationObserver(() => {
        if (!errorMessage.classList.contains('hidden')) {
            clearTimeout(errorTimeout);
            errorTimeout = setTimeout(hideErrorMessage, 5000);
        }
    });
    observer.observe(errorMessage, { attributes: true, attributeFilter: ['class'] });
}

// ===================================
// API FUNCTIONS
// ===================================

async function fetchWithCache(url) {
    const cached = cache.get(url);
    
    // Return cached data if still valid
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log('Using cached data for:', url);
        return cached.data;
    }
    
    // Fetch fresh data
    console.log('Fetching fresh data from:', url);
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Store in cache
    cache.set(url, {
        data: data,
        timestamp: Date.now()
    });
    
    return data;
}

async function loadAllStocks() {
    // Use our curated list of US stocks, Forex, and Crypto
    // MOCK_STOCKS loaded from demo-data.js
    allStocks = MOCK_STOCKS;
    console.log(`Loaded ${allStocks.length} assets for search (US stocks, Forex, Crypto)`);
}

async function fetchStockDetails(symbol) {
    try {
        // Use Yahoo Finance API if enabled
        if (USE_YAHOO_API) {
            return await fetchFromYahooFinance(symbol);
        }
        
        // Fallback to demo data (API not configured yet)
        throw new Error('API not configured, using demo data');
        
    } catch (error) {
        console.error('Error fetching stock data:', error);
        
        // Fallback to mock data
        const mockStock = MOCK_STOCKS.find(s => s.symbol === symbol);
        if (mockStock) {
            console.log(`ℹ️ Using demo data for ${symbol}`);
            showErrorMessage(`ℹ️ Using high-quality demo data. Yahoo Finance API integration pending.`);
            setTimeout(hideErrorMessage, 5000);
            return mockStock;
        }
        
        throw error;
    }
}

// Yahoo Finance API fetcher
// TODO: Implement Yahoo Finance API integration after authentication setup
async function fetchFromYahooFinance(symbol) {
    console.log(`Fetching data for ${symbol} from Yahoo Finance...`);
    
    try {
        // TODO: Add Yahoo Finance API endpoint here
        // Example endpoint structure (to be configured):
        // const url = `YOUR_YAHOO_FINANCE_API_ENDPOINT?symbol=${symbol}`;
        
        // Placeholder - will be implemented after Yahoo Finance API setup
        throw new Error('Yahoo Finance API not yet configured');
        
        // When implemented, transform Yahoo Finance response to our format:
        // const stockData = {
        //     symbol: symbol,
        //     name: data.longName || data.shortName || symbol,
        //     sector: data.sector || 'N/A',
        //     price: data.regularMarketPrice || 0,
        //     previousClose: data.regularMarketPreviousClose || 0,
        //     open: data.regularMarketOpen || 0,
        //     dayHigh: data.regularMarketDayHigh || 0,
        //     dayLow: data.regularMarketDayLow || 0,
        //     week52High: data.fiftyTwoWeekHigh || 0,
        //     week52Low: data.fiftyTwoWeekLow || 0,
        //     volume: data.regularMarketVolume || 0,
        //     avgVolume: data.averageDailyVolume10Day || 0,
        //     marketCap: data.marketCap || 0,
        //     pe: data.trailingPE || 0,
        //     eps: data.epsTrailingTwelveMonths || 0
        // };
        // return stockData;
        
    } catch (error) {
        console.error('Yahoo Finance API error:', error);
        throw error;
    }
}

// ===================================
// SEARCH FUNCTIONALITY
// ===================================

function handleSearchInput(event) {
    clearTimeout(searchTimeout);
    const query = event.target.value.trim();
    
    if (query.length === 0) {
        searchResults.classList.remove('active');
        return;
    }
    
    searchTimeout = setTimeout(() => {
        const results = filterStocks(query);
        displaySearchResults(results);
    }, DEBOUNCE_DELAY);
}

function filterStocks(query) {
    const searchTerm = query.toLowerCase();
    return allStocks.filter(stock => 
        stock.symbol.toLowerCase().includes(searchTerm) ||
        stock.name.toLowerCase().includes(searchTerm)
    ).slice(0, 10); // Limit to 10 results
}

function displaySearchResults(results) {
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No stocks found</div>';
        searchResults.classList.add('active');
        return;
    }
    
    const html = results.map(stock => `
        <div class="search-result-item" data-symbol="${stock.symbol}">
            <div class="result-symbol">${stock.symbol}</div>
            <div class="result-name">${stock.name}</div>
            <span class="result-sector">${stock.sector || 'N/A'}</span>
        </div>
    `).join('');
    
    searchResults.innerHTML = html;
    searchResults.classList.add('active');
    
    // Add click handlers to results
    document.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
            const symbol = item.dataset.symbol;
            selectStock(symbol);
        });
    });
}

// ===================================
// STOCK SELECTION & DISPLAY
// ===================================

async function selectStock(symbol) {
    console.log('Selected stock:', symbol);
    
    // Close search results
    searchResults.classList.remove('active');
    
    // Show stock section with loading state
    stockSection.classList.remove('hidden');
    skeletonLoader.classList.remove('hidden');
    stockContent.classList.add('hidden');
    
    // Scroll to stock section
    stockSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    try {
        // Fetch stock details
        const stockData = await fetchStockDetails(symbol);
        
        if (!stockData) {
            throw new Error('No stock data received');
        }
        
        currentStock = stockData;
        
        // Generate historical data
        currentHistoricalData = generateHistoricalData(stockData.price, 365);
        
        // Generate predictions
        currentPredictions = predictStockPrice(currentHistoricalData);
        
        // Display everything
        displayStockInfo(stockData);
        displayPredictions(currentPredictions, stockData.price);
        
        // Initialize chart
        initializeChart(currentHistoricalData, currentPredictions, '1M');
        
        // Hide loading, show content
        skeletonLoader.classList.add('hidden');
        stockContent.classList.remove('hidden');
        
    } catch (error) {
        console.error('Error loading stock:', error);
        showErrorMessage('Unable to load stock information. Please try again or search for a different stock.');
        stockSection.classList.add('hidden');
    }
}

function displayStockInfo(stock) {
    // Header info
    document.getElementById('stockSymbol').textContent = stock.symbol;
    document.getElementById('stockName').textContent = stock.name;
    document.getElementById('stockSector').textContent = stock.sector || 'N/A';
    
    // Price info
    document.getElementById('currentPrice').textContent = formatCurrency(stock.price);
    
    const change = stock.price - (stock.previousClose || stock.price);
    const changePercent = stock.previousClose ? ((change / stock.previousClose) * 100) : 0;
    
    const priceChangeEl = document.getElementById('priceChange');
    const changeClass = change >= 0 ? 'positive' : 'negative';
    const changeSymbol = change >= 0 ? '↑' : '↓';
    
    priceChangeEl.className = `price-change ${changeClass}`;
    priceChangeEl.innerHTML = `
        <span class="change-amount">${changeSymbol} ${formatCurrency(Math.abs(change))}</span>
        <span class="change-percent">(${change >= 0 ? '+' : ''}${changePercent.toFixed(2)}%)</span>
    `;
    
    // Details
    document.getElementById('volume').textContent = formatNumber(stock.volume);
    document.getElementById('marketCap').textContent = formatMarketCap(stock.marketCap);
    document.getElementById('dayRange').textContent = `${formatCurrency(stock.dayLow || stock.price * 0.98)} - ${formatCurrency(stock.dayHigh || stock.price * 1.02)}`;
    document.getElementById('weekRange').textContent = `${formatCurrency(stock.week52Low || stock.price * 0.85)} - ${formatCurrency(stock.week52High || stock.price * 1.15)}`;
    document.getElementById('peRatio').textContent = stock.pe ? stock.pe.toFixed(2) : 'N/A';
    document.getElementById('lastUpdated').textContent = 'Just now';
}

function displayPredictions(predictions, currentPrice) {
    // Helper function to format price based on value
    const formatPrice = (price) => {
        if (price < 1) return '$' + price.toFixed(4);
        if (price < 100) return '$' + price.toFixed(2);
        return formatCurrency(price);
    };
    
    // 7 days
    document.getElementById('prediction7').textContent = formatPrice(predictions.day7);
    const change7 = ((predictions.day7 - currentPrice) / currentPrice) * 100;
    document.getElementById('predictionChange7').textContent = `${change7 >= 0 ? '+' : ''}${change7.toFixed(2)}%`;
    document.getElementById('predictionChange7').style.color = change7 >= 0 ? '#10B981' : '#EF4444';
    
    // 30 days
    document.getElementById('prediction30').textContent = formatPrice(predictions.day30);
    const change30 = ((predictions.day30 - currentPrice) / currentPrice) * 100;
    document.getElementById('predictionChange30').textContent = `${change30 >= 0 ? '+' : ''}${change30.toFixed(2)}%`;
    document.getElementById('predictionChange30').style.color = change30 >= 0 ? '#10B981' : '#EF4444';
    
    // 90 days
    document.getElementById('prediction90').textContent = formatPrice(predictions.day90);
    const change90 = ((predictions.day90 - currentPrice) / currentPrice) * 100;
    document.getElementById('predictionChange90').textContent = `${change90 >= 0 ? '+' : ''}${change90.toFixed(2)}%`;
    document.getElementById('predictionChange90').style.color = change90 >= 0 ? '#10B981' : '#EF4444';
    
    // 180 days
    document.getElementById('prediction180').textContent = formatPrice(predictions.day180);
    const change180 = ((predictions.day180 - currentPrice) / currentPrice) * 100;
    document.getElementById('predictionChange180').textContent = `${change180 >= 0 ? '+' : ''}${change180.toFixed(2)}%`;
    document.getElementById('predictionChange180').style.color = change180 >= 0 ? '#10B981' : '#EF4444';
    
    // 365 days (1 year)
    document.getElementById('prediction365').textContent = formatPrice(predictions.day365);
    const change365 = ((predictions.day365 - currentPrice) / currentPrice) * 100;
    document.getElementById('predictionChange365').textContent = `${change365 >= 0 ? '+' : ''}${change365.toFixed(2)}%`;
    document.getElementById('predictionChange365').style.color = change365 >= 0 ? '#10B981' : '#EF4444';
    
    // 730 days (2 years)
    document.getElementById('prediction730').textContent = formatPrice(predictions.day730);
    const change730 = ((predictions.day730 - currentPrice) / currentPrice) * 100;
    document.getElementById('predictionChange730').textContent = `${change730 >= 0 ? '+' : ''}${change730.toFixed(2)}%`;
    document.getElementById('predictionChange730').style.color = change730 >= 0 ? '#10B981' : '#EF4444';
    
    // Confidence and factors
    document.getElementById('confidenceLevel').textContent = predictions.confidence;
    
    const factorsHtml = predictions.factors.map(factor => `<li>${factor}</li>`).join('');
    document.getElementById('factorsList').innerHTML = factorsHtml;
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

function formatCurrency(value) {
    if (value === null || value === undefined) return 'N/A';
    return 'Rp ' + Math.round(value).toLocaleString('id-ID');
}

function formatNumber(value) {
    if (value === null || value === undefined) return 'N/A';
    return value.toLocaleString('id-ID');
}

function formatMarketCap(value) {
    if (value === null || value === undefined) return 'N/A';
    
    if (value >= 1e12) {
        return 'Rp ' + (value / 1e12).toFixed(2) + 'T';
    } else if (value >= 1e9) {
        return 'Rp ' + (value / 1e9).toFixed(2) + 'B';
    } else if (value >= 1e6) {
        return 'Rp ' + (value / 1e6).toFixed(2) + 'M';
    }
    return formatCurrency(value);
}

function showErrorMessage(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideErrorMessage() {
    errorMessage.classList.add('hidden');
}

// ===================================
// HISTORICAL DATA GENERATION
// ===================================

function generateHistoricalData(currentPrice, days) {
    const data = [];
    let price = currentPrice;
    const dailyVolatility = 0.015; // 1.5% daily volatility
    
    // Work backwards from today
    for (let i = days; i >= 0; i--) {
        // Random walk with slight upward bias
        const change = (Math.random() - 0.48) * dailyVolatility;
        price = price / (1 + change);
        
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        data.push({
            date: date.toISOString().split('T')[0],
            price: Math.round(price),
            volume: Math.floor(10000000 + Math.random() * 20000000)
        });
    }
    
    return data;
}

function addDays(dateString, days) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
}

// ===================================
// INPUT VALIDATION
// ===================================

function sanitizeStockSymbol(input) {
    // Remove any non-alphanumeric characters
    const sanitized = input.toUpperCase().replace(/[^A-Z0-9]/g, '');
    // Limit length
    return sanitized.substring(0, 10);
}

function validateStockSymbol(symbol) {
    // Indonesian stock codes are typically 4 characters
    const regex = /^[A-Z]{4}$/;
    return regex.test(symbol);
}
