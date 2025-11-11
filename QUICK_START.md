# 🚀 Quick Start Guide

Get your Indonesian Stock Price Predictor running in **under 2 minutes**!

## ⚡ Fastest Way to Run

### Method 1: Double-Click (Easiest)

1. **Open the file:**
   - Navigate to the project folder
   - Double-click `index.html`
   - The app opens in your default browser ✅

That's it! No installation, no setup, no dependencies.

---

## 🌐 Run with Local Server (Recommended)

For the best experience, use a local web server:

### Using Python (Built-in on Mac/Linux)

```bash
# Navigate to project folder
cd indonesian-stock-predictor

# Start server
python -m http.server 8000

# Open browser to:
# http://localhost:8000
```

### Using Node.js

```bash
# Install http-server globally (one-time)
npm install -g http-server

# Navigate to project folder
cd indonesian-stock-predictor

# Start server
http-server -p 8000

# Open browser to:
# http://localhost:8000
```

### Using VS Code

1. Install **Live Server** extension
2. Right-click `index.html`
3. Select **"Open with Live Server"**
4. Browser opens automatically ✅

---

## 📱 First Steps

Once the app is running:

### 1. Search for a Stock

Try these popular Indonesian stocks:

- **BBCA** - Bank Central Asia (Banking)
- **TLKM** - Telkom Indonesia (Telecommunications)
- **ASII** - Astra International (Automotive)
- **UNVR** - Unilever Indonesia (Consumer Goods)
- **BBRI** - Bank Rakyat Indonesia (Banking)

### 2. Explore the Interface

- **Current Price** - Large display at the top
- **Price Chart** - Interactive chart with time ranges
- **AI Predictions** - 7, 30, and 90-day forecasts
- **Time Ranges** - Click buttons: 1D, 5D, 1M, 3M, 6M, 1Y, 5Y

### 3. Understand Predictions

The AI analyzes:
- ✅ Moving averages (SMA10, SMA30)
- ✅ RSI (Relative Strength Index)
- ✅ Price momentum
- ✅ Volatility patterns

---

## 🔧 Troubleshooting

### Issue: Search not working

**Solution:** Check your internet connection. The app needs to fetch stock data from the API.

### Issue: Chart not displaying

**Solution:** 
1. Make sure Chart.js loaded (check browser console)
2. Try refreshing the page
3. Clear browser cache

### Issue: Predictions seem off

**Note:** Predictions are educational simulations based on technical analysis. They are NOT financial advice.

### Issue: Blank page

**Solution:**
1. Check browser console for errors (F12)
2. Make sure all files are in the same folder:
   - index.html
   - styles.css
   - script.js
   - chart.js
   - prediction.js

---

## 📊 Sample Workflow

Here's a typical usage flow:

1. **Open app** → See search bar
2. **Type "BBCA"** → Autocomplete shows Bank Central Asia
3. **Click result** → Loading animation appears
4. **View data** → Price, chart, and predictions load
5. **Change timeframe** → Click "1Y" to see yearly trend
6. **Check predictions** → Review 7/30/90 day forecasts
7. **Read factors** → Understand what's driving the prediction

---

## 🎯 Pro Tips

### Tip 1: Compare Timeframes
- Short-term (1D, 5D) - See recent volatility
- Medium-term (1M, 3M) - Identify trends
- Long-term (1Y, 5Y) - Understand overall trajectory

### Tip 2: Check Multiple Stocks
- Search different stocks in the same sector
- Compare prediction confidence levels
- Look for sector-wide trends

### Tip 3: Understand Confidence Levels
- **High (75-85%)** - Strong trend, low volatility
- **Moderate (60-75%)** - Normal conditions
- **Low (45-60%)** - High volatility, uncertain trend

### Tip 4: Read the Factors
- Each prediction shows 4-5 key factors
- Factors explain WHY the prediction was made
- Look for emoji indicators:
  - 📈 Bullish signals
  - 📉 Bearish signals
  - ⚠️ Warning signs
  - ✅ Positive indicators

---

## 🚀 Deploy Your Own

Want to share this with others?

### GitHub Pages (Free)

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/yourusername/stock-predictor.git
git push -u origin main

# Enable GitHub Pages in repo settings
# Your site: https://yourusername.github.io/stock-predictor
```

### Netlify (Free, Easiest)

1. Go to [netlify.com](https://www.netlify.com/)
2. Drag and drop your project folder
3. Done! Get instant URL

---

## 📚 Learn More

- **Full Documentation:** See `README.md`
- **Customize:** Edit `styles.css` for colors
- **Enhance Predictions:** Modify `prediction.js`
- **Add Features:** Extend `script.js`

---

## ⚠️ Important Reminder

**This is an educational tool!**

- ❌ NOT financial advice
- ❌ NOT guaranteed predictions
- ✅ For learning technical analysis
- ✅ For understanding market trends

Always do your own research before investing real money.

---

## 🆘 Need Help?

- **Check console:** Press F12 → Console tab
- **Read README:** Full documentation available
- **Open issue:** Report bugs on GitHub
- **Contact:** See README for contact info

---

**Happy analyzing! 📈**

*Made with ❤️ for Indonesian stock market enthusiasts*
