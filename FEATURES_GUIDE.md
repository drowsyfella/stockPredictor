# 🎯 Features Guide - Indonesian Stock Price Predictor

A visual and detailed guide to all features in your application.

---

## 🏠 Landing Page

### What You See First

```
┌─────────────────────────────────────────────────┐
│  📈 IDX Stock Predictor                         │ ← Header (Blue)
└─────────────────────────────────────────────────┘

        Search Indonesian Stocks                    ← Title

    ┌───────────────────────────────────────┐
    │  Search by stock code or name...      │      ← Search Bar
    └───────────────────────────────────────┘
```

**Features:**
- Clean, minimal interface
- Prominent search bar
- Clear call-to-action
- Professional blue header

---

## 🔍 Search Experience

### Step 1: Start Typing

```
Search: "bb"

┌───────────────────────────────────────┐
│  BBCA                                 │ ← Stock Code (Blue)
│  Bank Central Asia Tbk                │ ← Company Name
│  [Finance]                            │ ← Sector Tag
├───────────────────────────────────────┤
│  BBRI                                 │
│  Bank Rakyat Indonesia Tbk            │
│  [Finance]                            │
├───────────────────────────────────────┤
│  BBNI                                 │
│  Bank Negara Indonesia Tbk            │
│  [Finance]                            │
└───────────────────────────────────────┘
```

**Features:**
- Real-time autocomplete
- Shows up to 10 results
- Displays stock code, name, and sector
- Hover effect on items
- Click to select

### Step 2: Loading State

```
┌─────────────────────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                  │ ← Skeleton Title
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      │ ← Skeleton Text
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      │
│                                         │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │ ← Skeleton Chart
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
└─────────────────────────────────────────┘
```

**Features:**
- Smooth skeleton animation (pulse effect)
- No jarring spinners
- Professional loading experience
- Indicates data is being fetched

---

## 📊 Stock Information Display

### Desktop Layout (> 1024px)

```
┌──────────────────────┬────────────────────────────────────┐
│  BBCA                │  Price History                     │
│  Bank Central Asia   │  [1D][5D][1M][3M][6M][1Y][5Y]     │
│  [Finance]           │                                    │
│                      │         ╱╲                         │
│  Rp 9,750           │       ╱    ╲      ╱╲               │
│  ↑ +150 (+1.56%)    │     ╱        ╲  ╱    ╲             │
│                      │   ╱            ╲        ╲          │
│  Volume: 12.5M      │ ╱                        ╲         │
│  Market Cap: 1.2T   │                                    │
│  Day Range:         │  [Hover for exact values]          │
│    9,600 - 9,800    │                                    │
│  52w Range:         │                                    │
│    8,200 - 10,500   │                                    │
│  P/E: 25.5          │                                    │
│  Updated: Just now  │                                    │
└──────────────────────┴────────────────────────────────────┘
```

### Mobile Layout (< 640px)

```
┌─────────────────────────┐
│  BBCA                   │
│  Bank Central Asia Tbk  │
│  [Finance]              │
│                         │
│  Rp 9,750              │
│  ↑ +150 (+1.56%)       │
│                         │
│  Volume: 12.5M         │
│  Market Cap: 1.2T      │
│  Day: 9,600 - 9,800    │
│  52w: 8,200 - 10,500   │
│  P/E: 25.5             │
├─────────────────────────┤
│  Price History          │
│  [1D][5D][1M][3M]      │
│  [6M][1Y][5Y]          │
│                         │
│      ╱╲                 │
│    ╱    ╲      ╱╲       │
│  ╱        ╲  ╱    ╲     │
│                         │
└─────────────────────────┘
```

---

## 📈 Interactive Chart Features

### Chart Elements

```
Price History                    [1D][5D][1M][3M][6M][1Y][5Y]
                                              ↑ Active (Blue)

Rp 10,000 ┤                    ╱─ ─ ─ ─ ─ ─ ─ ─ ─  ← Prediction (Dashed)
          │                  ╱
Rp 9,800  ┤              ╱╲╱
          │            ╱    
Rp 9,600  ┤        ╱╲╱       ← Actual Price (Solid Blue)
          │      ╱
Rp 9,400  ┤    ╱
          │  ╱
Rp 9,200  ┤╱
          └─────────────────────────────────────────
           Oct 1    Oct 15    Oct 30    Nov 15
```

**Features:**
- Blue solid line = Actual prices
- Amber dashed line = Predictions
- Smooth curves (tension: 0.4)
- Hover tooltip shows exact values
- Responsive height (250px - 450px)
- Animated transitions (0.5s)

### Hover Tooltip

```
┌─────────────────────┐
│  Oct 15, 2024       │
│  Actual: Rp 9,650   │
│  Predicted: Rp 9,800│
└─────────────────────┘
```

### Time Range Buttons

```
[1D] [5D] [1M] [3M] [6M] [1Y] [5Y]
           ↑
      Active (Blue background)
      Others (White with border)
```

**Behavior:**
- Click to change timeframe
- Active button highlighted
- Chart updates smoothly
- Data filters automatically

---

## 🤖 AI Prediction Panel

### Full Prediction Display

```
┌─────────────────────────────────────────────────────────┐
│  🤖 AI Price Predictions                                │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ 7 Days   │  │ 30 Days  │  │ 90 Days  │            │
│  │ Rp 9,900 │  │ Rp 10,200│  │ Rp 10,900│            │
│  │ +1.54%   │  │ +4.62%   │  │ +11.79%  │            │
│  └──────────┘  └──────────┘  └──────────┘            │
│                                                         │
│  Confidence Level: Moderate (68%)                      │
│                                                         │
│  Key Factors:                                          │
│  • 📈 Positive momentum detected                       │
│  • 🎯 Low price volatility                            │
│  • ✅ Short-term average above long-term              │
│  • ⚪ RSI in neutral zone                             │
│  • ➡️ Weak momentum - sideways action                 │
│                                                         │
│  ⚠️ Disclaimer: Educational purposes only.             │
│     Not financial advice.                              │
└─────────────────────────────────────────────────────────┘
```

**Features:**
- Purple gradient background
- Glass-morphism cards
- Color-coded changes (green/red)
- Emoji indicators for factors
- Clear confidence level
- Prominent disclaimer

### Prediction Cards (Mobile)

```
┌─────────────────┐
│    7 Days       │
│   Rp 9,900      │
│   +1.54%        │
└─────────────────┘

┌─────────────────┐
│   30 Days       │
│   Rp 10,200     │
│   +4.62%        │
└─────────────────┘

┌─────────────────┐
│   90 Days       │
│   Rp 10,900     │
│   +11.79%       │
└─────────────────┘
```

**Stacked vertically on mobile**

---

## 🎨 Color Coding System

### Price Changes

**Positive (Green):**
```
Rp 9,750
↑ +150 (+1.56%)
```
- Color: #10B981 (Green)
- Arrow: ↑
- Shows gains

**Negative (Red):**
```
Rp 9,750
↓ -150 (-1.56%)
```
- Color: #EF4444 (Red)
- Arrow: ↓
- Shows losses

### Prediction Factors

- 📈 **Green indicators** = Bullish signals
- 📉 **Red indicators** = Bearish signals
- ⚠️ **Yellow indicators** = Warning signs
- ✅ **Check marks** = Positive factors
- ❌ **X marks** = Negative factors
- ⚪ **Neutral** = Balanced conditions

---

## 🎭 Animations & Interactions

### 1. Search Bar Focus

```
Before:  ┌─────────────────┐
         │  Search...      │
         └─────────────────┘

After:   ┌─────────────────┐
         │  Search...      │ ← Blue border + shadow
         └─────────────────┘
```
- Transition: 0.3s ease
- Blue border appears
- Subtle shadow effect

### 2. Button Hover

```
Before:  [1M]  ← White background

Hover:   [1M]  ← Lifts up 2px
              ← Light gray background
```
- Transform: translateY(-2px)
- Duration: 0.2s

### 3. Button Click

```
Click:   [1M]  ← Scales down slightly
              ← Scale(0.95)
```
- Duration: 0.1s
- Tactile feedback

### 4. Card Hover (Predictions)

```
Before:  ┌──────────┐
         │ 7 Days   │
         │ Rp 9,900 │
         └──────────┘

Hover:   ┌──────────┐
         │ 7 Days   │  ← Lifts up 4px
         │ Rp 9,900 │
         └──────────┘
```
- Transform: translateY(-4px)
- Duration: 0.2s

### 5. Chart Load Animation

```
Frame 1:  ─────────────  (Fade in)
Frame 2:  ──╱───────────
Frame 3:  ──╱╲──────────
Frame 4:  ──╱╲╱╲────────
Final:    ──╱╲╱╲╱╲──────
```
- Duration: 0.5s
- Easing: ease-in-out

---

## 📱 Responsive Breakpoints

### Mobile (0 - 640px)

```
┌─────────────┐
│   Header    │
│   Search    │
│   Stock     │
│   Info      │
│   Chart     │
│   (Full)    │
│   Predict   │
│   (Stack)   │
└─────────────┘
```

**Features:**
- Single column layout
- Stacked cards
- Full-width elements
- 16px padding
- 250px chart height

### Tablet (641px - 1024px)

```
┌─────────────────┐
│     Header      │
│     Search      │
│   Stock Info    │
│   Chart (Full)  │
│   Predictions   │
│   (3 columns)   │
└─────────────────┘
```

**Features:**
- Single column, wider
- 24px padding
- 350px chart height
- Prediction cards in row

### Desktop (1025px+)

```
┌─────────────────────────┐
│        Header           │
│        Search           │
│  ┌────────┬───────────┐ │
│  │ Stock  │   Chart   │ │
│  │ Info   │  (Large)  │ │
│  │ (30%)  │   (70%)   │ │
│  └────────┴───────────┘ │
│    Predictions (Full)   │
└─────────────────────────┘
```

**Features:**
- Two-column layout
- 30/70 split
- 48px padding
- 450px chart height
- Max width: 1280px

---

## 🔔 Error Handling

### Error Message Display

```
┌─────────────────────────────────────┐
│  ⚠️  Unable to load stock data.     │
│      Please try again.          [×] │
└─────────────────────────────────────┘
```

**Features:**
- Fixed position at top
- Red background (#EF4444)
- White text
- Close button (×)
- Auto-dismiss after 5 seconds

### Common Error Scenarios

1. **Stock Not Found**
   ```
   ⚠️ Stock not found. Please check the symbol and try again.
   ```

2. **API Error**
   ```
   ⚠️ Unable to load stock data. Please try again later.
   ```

3. **Network Error**
   ```
   ⚠️ Network error. Please check your connection.
   ```

---

## 🎯 User Flow Examples

### Example 1: Quick Stock Check

1. User opens app
2. Types "BBCA"
3. Clicks on "Bank Central Asia"
4. Views current price: Rp 9,750 ↑ +1.56%
5. Checks 1M chart
6. Reads 30-day prediction: Rp 10,200

**Time: ~10 seconds**

### Example 2: Detailed Analysis

1. User searches "TLKM"
2. Reviews all stock details
3. Switches between timeframes (1M → 3M → 1Y)
4. Compares all predictions (7/30/90 days)
5. Reads key factors
6. Checks confidence level

**Time: ~2 minutes**

### Example 3: Mobile Quick Check

1. Opens on phone
2. Taps search bar
3. Types stock code
4. Scrolls through info
5. Swipes chart
6. Views predictions

**Time: ~15 seconds**

---

## 💡 Pro Tips for Users

### Tip 1: Understanding Predictions

**High Confidence (75-85%)**
- Strong trend detected
- Low volatility
- Clear technical signals
- More reliable prediction

**Moderate Confidence (60-75%)**
- Normal market conditions
- Average volatility
- Mixed signals
- Standard reliability

**Low Confidence (45-60%)**
- High volatility
- Unclear trend
- Conflicting signals
- Less reliable prediction

### Tip 2: Reading the Chart

**Upward Trend:**
```
    ╱
  ╱
╱
```
- Price increasing
- Bullish signal
- Consider buying (educational only!)

**Downward Trend:**
```
╲
  ╲
    ╲
```
- Price decreasing
- Bearish signal
- Consider caution

**Sideways:**
```
─────
```
- Price stable
- Neutral signal
- Wait and watch

### Tip 3: Using Timeframes

- **1D, 5D** - Day trading, short-term
- **1M, 3M** - Swing trading, medium-term
- **6M, 1Y** - Position trading, long-term
- **5Y** - Investment, very long-term

---

## 🎨 Visual Design Elements

### Typography Hierarchy

```
Stock Symbol (BBCA)           → 28px, Bold
Current Price (Rp 9,750)      → 32-48px, Bold
Price Change (+1.56%)         → 20-24px, Semi-bold
Section Headers               → 20-24px, Semi-bold
Body Text                     → 16px, Regular
Small Labels                  → 14px, Regular
Captions                      → 12px, Regular
```

### Spacing System

```
Micro:   4px   (icon gaps)
Small:   8px   (tight spacing)
Medium:  16px  (standard spacing)
Large:   24px  (section spacing)
XLarge:  32px  (major sections)
XXLarge: 48px  (page padding)
```

### Border Radius

```
Small:   4px   (tags, small elements)
Medium:  8px   (buttons, inputs)
Large:   12px  (cards, panels)
Round:   16px  (badges, pills)
```

---

## 🏆 Best Practices for Users

### DO:
✅ Use for educational purposes
✅ Compare multiple stocks
✅ Check different timeframes
✅ Read all factors
✅ Understand confidence levels
✅ Do your own research

### DON'T:
❌ Use as sole investment advice
❌ Ignore the disclaimer
❌ Make decisions based only on predictions
❌ Expect 100% accuracy
❌ Invest without research
❌ Blame the app for losses

---

**Enjoy exploring Indonesian stocks! 📈**

*Remember: This is an educational tool. Always do your own research before investing.*
