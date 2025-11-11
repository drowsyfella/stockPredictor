# 📈 Stock Price Predictor

A modern, lightweight, and fully responsive web application for tracking and predicting US stocks, Forex, and Cryptocurrency prices using AI-powered technical analysis.

![Indonesian Stock Predictor](https://img.shields.io/badge/Status-Live-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 🔍 Smart Asset Search
- **Real-time autocomplete** suggestions as you type
- Search **US stocks** (e.g., "AAPL", "MSFT"), **Forex** (e.g., "EUR/USD"), or **Crypto** (e.g., "BTC/USD")
- Search by symbol or company name
- Debounced input (300ms) for optimized performance
- Clean, intuitive interface

### 📊 Comprehensive Stock Information
- **Large, bold current price** display with color-coded changes
- Real-time price change indicators (↑/↓)
- Trading volume and market capitalization
- Day high/low and 52-week ranges
- P/E ratio and sector classification
- Last updated timestamp

### 📈 Interactive Price Charts
- Beautiful line charts powered by **Chart.js**
- Multiple time range options: **1D, 5D, 1M, 3M, 6M, 1Y, 5Y**
- Smooth animations and transitions
- Hover tooltips with exact price and date
- Responsive design for all screen sizes

### 🤖 AI-Powered Price Predictions
- **6 prediction timeframes**: 7 days, 30 days, 90 days, 180 days, 1 year, 2 years
- Technical analysis using:
  - Simple Moving Averages (SMA)
  - Relative Strength Index (RSI)
  - Momentum indicators
  - Volatility analysis
- **Confidence levels** for each prediction
- **Key factors** explaining the prediction
- Visual prediction overlay on charts

### 📱 Fully Responsive Design
- **Mobile-first** approach
- Optimized for phones, tablets, and desktops
- Touch-friendly interface
- Fast loading with skeleton screens

## 🚀 Live Demo

**[View Live Demo](#)** *(Add your GitHub Pages URL here)*

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox/Grid
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Chart.js** - Data visualization
- **Demo Data** - High-quality simulated data (40 assets)
- **Yahoo Finance API** - Ready for integration (pending setup)

## 📦 Installation & Setup

### Option 1: Direct Use (No Installation Required)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/stock-predictor.git
   cd stock-predictor
   ```

2. **Open in browser:**
   - Simply open `index.html` in your web browser
   - No build process or dependencies required!

### Option 2: Local Development Server

1. **Using Python:**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Then open http://localhost:8000
   ```

2. **Using Node.js:**
   ```bash
   npx http-server -p 8000
   
   # Then open http://localhost:8000
   ```

3. **Using VS Code:**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

## 🌐 Deployment

### Deploy to GitHub Pages

1. **Create a new repository** on GitHub

2. **Push your code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Stock Price Predictor"
   git branch -M main
   git remote add origin https://github.com/yourusername/stock-predictor.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to repository **Settings** → **Pages**
   - Source: **main branch** → **/ (root)**
   - Click **Save**
   - Your site will be live at: `https://yourusername.github.io/stock-predictor`

### Deploy to Netlify

1. **Drag and drop** the project folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect your GitHub repository for automatic deployments

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

## 📖 How to Use

1. **Search for an asset:**
   - Type symbol (e.g., "AAPL", "EUR/USD", "BTC/USD") or company name
   - Select from autocomplete suggestions (40 assets available)

2. **View asset information:**
   - Current price, changes, and key metrics
   - Interactive price chart with multiple timeframes
   - Asset details and sector information

3. **Check AI predictions:**
   - View predictions for 7 days, 30 days, 90 days, 180 days, 1 year, and 2 years
   - Review confidence levels and key factors
   - See prediction overlay on the chart

4. **Explore different timeframes:**
   - Click time range buttons (1D, 5D, 1M, etc.)
   - Chart updates smoothly with animation

## 🎨 Customization

### Change Color Scheme

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary: #2563EB;        /* Main blue color */
    --success: #10B981;        /* Green for gains */
    --danger: #EF4444;         /* Red for losses */
    --background: #FFFFFF;     /* Background color */
    /* ... more colors */
}
```

### Modify Prediction Algorithm

Edit the prediction logic in `prediction.js`:

```javascript
function predictStockPrice(historicalData) {
    // Customize your prediction algorithm here
    // Adjust weights, add new indicators, etc.
}
```

### Add More Technical Indicators

Extend the `prediction.js` file with additional indicators:

```javascript
function calculateMACD(prices) {
    // Your MACD implementation
}

function calculateBollingerBands(prices) {
    // Your Bollinger Bands implementation
}
```

## 📊 Demo Data

The app currently uses high-quality demo data with **40 assets**:

### US Stocks (30)
- **Technology**: AAPL, MSFT, GOOGL, AMZN, META, NVDA, INTC, AMD, CSCO, ORCL, ADBE, CRM, NFLX
- **Finance**: JPM, V, PYPL
- **Consumer**: WMT, DIS, NKE, MCD, KO, PEP, SBUX
- **Healthcare**: PFE, JNJ
- **Industrial**: BA
- **Energy**: XOM, CVX
- **Transportation**: UBER

### Forex Pairs (5)
- EUR/USD, GBP/USD, USD/JPY, AUD/USD, USD/CAD

### Cryptocurrencies (5)
- BTC/USD, ETH/USD, BNB/USD, SOL/USD, XRP/USD

### Yahoo Finance API Integration (Pending)

The app is ready for Yahoo Finance API integration. See `script.js` line 156 for the placeholder function `fetchFromYahooFinance()`.

## 🧪 Testing

### Manual Testing Checklist

- [ ] Search functionality works correctly
- [ ] Stock details display properly
- [ ] Chart renders on all timeframes
- [ ] Predictions calculate accurately
- [ ] Responsive on mobile devices
- [ ] Error handling works (try invalid stock)
- [ ] Loading states appear correctly

### Browser Compatibility

Tested and working on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes:**
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📝 Project Structure

```
stock-predictor/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # Main JavaScript (search, API, display)
├── demo-data.js        # Demo data (40 assets)
├── chart.js            # Chart.js implementation
├── prediction.js       # AI prediction logic (6 timeframes)
├── README.md           # This file
└── .gitignore          # Git ignore rules
```

## ⚠️ Disclaimer

**IMPORTANT:** This application is for **educational purposes only**. 

- Price predictions are generated using technical analysis algorithms
- **NOT financial advice** - do not use for actual investment decisions
- Always conduct your own research before investing
- Past performance does not guarantee future results
- The developers are not responsible for any financial losses

## 📄 License

This project is licensed under the **MIT License** - see below for details:

```
MIT License

Copyright (c) 2024 Stock Price Predictor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- **Chart.js** for the amazing charting library
- **Google Fonts** for the Inter font family
- **Yahoo Finance** (API integration pending)
- All contributors and users of this project

## 🔌 API Integration Status

### Current Status: Demo Data Mode

The app currently uses **high-quality demo data** with 40 assets (30 US stocks, 5 forex pairs, 5 cryptocurrencies).

### Yahoo Finance API (Pending)

The codebase is ready for Yahoo Finance API integration:
- Placeholder function exists in `script.js` (line 156)
- Set `USE_YAHOO_API = true` when ready
- See `fetchFromYahooFinance()` function for implementation details

### How to Enable Real-Time Data

1. **Set up Yahoo Finance API authentication**
2. **Update the API endpoint** in `script.js`
3. **Set `USE_YAHOO_API = true`**
4. **Test with a few symbols** before going live

The app will automatically fall back to demo data if the API fails.

---

## 🔮 Future Enhancements

Planned features for future releases:

- [ ] Real-time price updates (WebSocket)
- [ ] Stock comparison tool
- [ ] Portfolio tracking
- [ ] News integration
- [ ] Advanced charting (candlestick, MACD, Bollinger Bands)
- [ ] Export data to CSV/PDF
- [ ] Dark mode toggle
- [ ] Multiple language support (Bahasa Indonesia)
- [ ] Stock alerts and notifications
- [ ] Historical accuracy tracking

## 📞 Support

If you encounter any issues or have questions:

1. **Check existing issues** on GitHub
2. **Open a new issue** with detailed description
3. **Contact via email** (see Author section)

---

**⭐ If you find this project useful, please give it a star on GitHub!**

Made with ❤️ for traders and investors worldwide
