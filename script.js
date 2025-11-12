// ===================================
// GLOBAL STATE & CONFIGURATION
// ===================================

// Stock Data API Configuration
// Using Google Sheets with real-time GoogleFinance data
// Data source: Google Sheets CSV with GOOGLEFINANCE() formulas

const USE_GOOGLE_SHEETS = true; // Using Google Sheets CSV data
const GOOGLE_SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT-RkFu9NSR9i9PQEwd9-1TmW7JiZuZyAYxyaGqNG9V3i8vr7WQQaqFvx01bzjZbL3G7rGPkdmRBXyl/pub?output=csv';
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
    try {
        if (USE_GOOGLE_SHEETS) {
            console.log('Loading stocks from Google Sheets...');
            // Load stocks from Google Sheets CSV
            const response = await fetch(GOOGLE_SHEETS_CSV_URL, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'text/csv,text/plain,*/*'
                }
            });
            
            if (response.ok) {
                const csvText = await response.text();
                console.log('CSV loaded, parsing stocks...');
                
                if (csvText && csvText.trim().length > 0) {
                    const sheetsStocks = parseAllStocksFromCSV(csvText);
                    if (sheetsStocks.length > 0) {
                        allStocks = sheetsStocks;
                        console.log(`✅ Loaded ${allStocks.length} stocks from Google Sheets`);
                        return;
                    }
                }
            } else {
                console.error(`Failed to load Google Sheets: ${response.status} - ${response.statusText}`);
            }
        }
    } catch (error) {
        console.error('Error loading stocks from Google Sheets:', error);
        
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            console.error('Network error: Unable to connect to Google Sheets');
        } else if (error.message.includes('CORS')) {
            console.error('CORS error: Google Sheets access blocked');
        }
    }
    
    // Fallback to demo data
    allStocks = MOCK_STOCKS;
    console.log(`📊 Using demo data: ${allStocks.length} assets (US stocks, Forex, Crypto)`);
}

// Parse all stocks from CSV for search functionality
function parseAllStocksFromCSV(csvText) {
    const lines = csvText.trim().split('\n');
    
    if (lines.length < 2) {
        return [];
    }
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const stocks = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
        
        if (values.length >= headers.length && values[0]) {
            const stockData = parseStockDataFromCSV(headers, values);
            if (stockData.symbol) {
                stocks.push({
                    symbol: stockData.symbol,
                    name: stockData.name || stockData.symbol,
                    sector: stockData.sector || 'N/A'
                });
            }
        }
    }
    
    return stocks;
}

async function fetchStockDetails(symbol) {
    try {
        // Use Google Sheets CSV data if enabled
        if (USE_GOOGLE_SHEETS) {
            return await fetchFromGoogleSheets(symbol);
        }
        
        // Fallback to demo data (Google Sheets not configured)
        throw new Error('Google Sheets not configured, using demo data');
        
    } catch (error) {
        console.error('Error fetching stock data:', error);
        
        // Fallback to mock data
        const mockStock = MOCK_STOCKS.find(s => s.symbol === symbol);
        if (mockStock) {
            console.log(`ℹ️ Using demo data for ${symbol}`);
            showErrorMessage(`ℹ️ Using demo data. Google Sheets integration issue: ${error.message}`);
            setTimeout(hideErrorMessage, 5000);
            return mockStock;
        }
        
        throw error;
    }
}

// Google Sheets CSV fetcher with multiple fallback methods
async function fetchFromGoogleSheets(symbol) {
    console.log(`Fetching data for ${symbol} from Google Sheets...`);
    
    // Try multiple approaches to fetch the data
    const fetchMethods = [
        // Method 1: Direct fetch with CORS
        async () => {
            console.log('Trying direct fetch...');
            const response = await fetch(GOOGLE_SHEETS_CSV_URL, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'text/csv,text/plain,*/*'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }
            
            return await response.text();
        },
        
        // Method 2: Try with no-cors mode (limited but might work)
        async () => {
            console.log('Trying no-cors fetch...');
            const response = await fetch(GOOGLE_SHEETS_CSV_URL, {
                method: 'GET',
                mode: 'no-cors'
            });
            
            // Note: no-cors mode doesn't allow reading response, so this is mainly for cache
            throw new Error('no-cors mode cannot read response');
        },
        
        // Method 3: Try alternative URL format
        async () => {
            console.log('Trying alternative URL format...');
            const altUrl = GOOGLE_SHEETS_CSV_URL.replace('/pub?output=csv', '/export?format=csv');
            const response = await fetch(altUrl, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'text/csv,text/plain,*/*'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }
            
            return await response.text();
        }
    ];
    
    let lastError;
    
    // Try each method
    for (let i = 0; i < fetchMethods.length; i++) {
        try {
            const csvText = await fetchMethods[i]();
            
            if (!csvText || csvText.trim().length === 0) {
                throw new Error('Empty CSV data received from Google Sheets');
            }
            
            console.log(`CSV data received via method ${i + 1}, length:`, csvText.length);
            
            const stockData = parseCSVForStock(csvText, symbol);
            
            if (!stockData) {
                throw new Error(`Stock ${symbol} not found in Google Sheets data`);
            }
            
            console.log(`✅ Successfully fetched ${symbol} from Google Sheets (method ${i + 1})`);
            return stockData;
            
        } catch (error) {
            console.warn(`Method ${i + 1} failed:`, error.message);
            lastError = error;
            continue;
        }
    }
    
    // All methods failed
    console.error('All fetch methods failed. Last error:', lastError);
    
    // More specific error messages
    if (lastError.name === 'TypeError' && lastError.message.includes('Failed to fetch')) {
        throw new Error('Network error: Unable to connect to Google Sheets. Check your internet connection or sheet permissions.');
    } else if (lastError.message.includes('CORS')) {
        throw new Error('CORS error: Google Sheets access blocked. Make sure the sheet is publicly accessible.');
    }
    
    throw lastError;
}

// Parse CSV data and find specific stock
function parseCSVForStock(csvText, symbol) {
    const lines = csvText.trim().split('\n');
    
    if (lines.length < 2) {
        throw new Error('Invalid CSV format: no data rows');
    }
    
    // Parse header row
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    console.log('CSV Headers:', headers);
    
    // Find the stock row
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
        
        // Assuming first column is symbol
        if (values[0] === symbol) {
            return parseStockDataFromCSV(headers, values);
        }
    }
    
    return null; // Stock not found
}

// Convert CSV row to stock data object
function parseStockDataFromCSV(headers, values) {
    const stockData = {};
    
    // Map CSV columns to our stock data structure
    for (let i = 0; i < headers.length; i++) {
        const header = headers[i].toLowerCase();
        const value = values[i];
        
        // Map common column names to our format
        if (header.includes('symbol')) {
            stockData.symbol = value;
        } else if (header.includes('name') || header.includes('company')) {
            stockData.name = value;
        } else if (header.includes('sector') || header.includes('industry')) {
            stockData.sector = value;
        } else if (header.includes('price') || header.includes('current')) {
            stockData.price = parseFloat(value) || 0;
        } else if (header.includes('previous') || header.includes('close')) {
            stockData.previousClose = parseFloat(value) || 0;
        } else if (header.includes('open')) {
            stockData.open = parseFloat(value) || 0;
        } else if (header.includes('high') && !header.includes('52')) {
            stockData.dayHigh = parseFloat(value) || 0;
        } else if (header.includes('low') && !header.includes('52')) {
            stockData.dayLow = parseFloat(value) || 0;
        } else if (header.includes('52') && header.includes('high')) {
            stockData.week52High = parseFloat(value) || 0;
        } else if (header.includes('52') && header.includes('low')) {
            stockData.week52Low = parseFloat(value) || 0;
        } else if (header.includes('volume')) {
            stockData.volume = parseInt(value) || 0;
        } else if (header.includes('market') && header.includes('cap')) {
            stockData.marketCap = parseFloat(value) || 0;
        } else if (header.includes('pe') || header.includes('p/e')) {
            stockData.pe = parseFloat(value) || 0;
        } else if (header.includes('eps')) {
            stockData.eps = parseFloat(value) || 0;
        }
    }
    
    // Set defaults for missing values
    stockData.symbol = stockData.symbol || 'N/A';
    stockData.name = stockData.name || stockData.symbol;
    stockData.sector = stockData.sector || 'N/A';
    stockData.price = stockData.price || 0;
    stockData.previousClose = stockData.previousClose || stockData.price;
    stockData.open = stockData.open || stockData.price;
    stockData.dayHigh = stockData.dayHigh || stockData.price * 1.02;
    stockData.dayLow = stockData.dayLow || stockData.price * 0.98;
    stockData.week52High = stockData.week52High || stockData.price * 1.15;
    stockData.week52Low = stockData.week52Low || stockData.price * 0.85;
    stockData.volume = stockData.volume || 1000000;
    stockData.avgVolume = stockData.avgVolume || stockData.volume;
    stockData.marketCap = stockData.marketCap || 0;
    stockData.pe = stockData.pe || 0;
    stockData.eps = stockData.eps || 0;
    
    return stockData;
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
    return '$' + Math.round(value).toLocaleString('en-US');
}

function formatNumber(value) {
    if (value === null || value === undefined) return 'N/A';
    return value.toLocaleString('en-US');
}

function formatMarketCap(value) {
    if (value === null || value === undefined) return 'N/A';
    
    if (value >= 1e12) {
        return '$' + (value / 1e12).toFixed(2) + 'T';
    } else if (value >= 1e9) {
        return '$' + (value / 1e9).toFixed(2) + 'B';
    } else if (value >= 1e6) {
        return '$' + (value / 1e6).toFixed(2) + 'M';
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
