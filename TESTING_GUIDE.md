# 🧪 Testing Guide - Indonesian Stock Price Predictor

Complete testing guide to ensure your application works perfectly.

---

## 🎯 Quick Test (2 Minutes)

### Basic Functionality Test

1. **Open the app**
   - [ ] Double-click `index.html`
   - [ ] App opens in browser
   - [ ] No console errors (F12 → Console)

2. **Test search**
   - [ ] Type "BBCA" in search bar
   - [ ] Autocomplete appears
   - [ ] Click on result
   - [ ] Stock data loads

3. **View stock info**
   - [ ] Current price displays
   - [ ] Price change shows (green/red)
   - [ ] Chart renders
   - [ ] Predictions appear

✅ **If all pass: App is working!**

---

## 🔍 Detailed Testing

### 1. Search Functionality

#### Test Case 1.1: Search by Stock Code
```
Input: "BBCA"
Expected: Shows Bank Central Asia in results
Status: [ ]
```

#### Test Case 1.2: Search by Company Name
```
Input: "Bank Central"
Expected: Shows BBCA in results
Status: [ ]
```

#### Test Case 1.3: Partial Search
```
Input: "bb"
Expected: Shows all stocks starting with BB
Status: [ ]
```

#### Test Case 1.4: No Results
```
Input: "XXXXXX"
Expected: Shows "No stocks found" message
Status: [ ]
```

#### Test Case 1.5: Empty Search
```
Input: "" (empty)
Expected: Autocomplete closes
Status: [ ]
```

#### Test Case 1.6: Debounce
```
Action: Type quickly "BBCA"
Expected: Only searches after 300ms pause
Status: [ ]
```

#### Test Case 1.7: Click Outside
```
Action: Click outside search results
Expected: Autocomplete closes
Status: [ ]
```

---

### 2. Stock Information Display

#### Test Case 2.1: Stock Symbol
```
Select: BBCA
Expected: Shows "BBCA" in large text
Status: [ ]
```

#### Test Case 2.2: Company Name
```
Select: BBCA
Expected: Shows "Bank Central Asia Tbk"
Status: [ ]
```

#### Test Case 2.3: Sector Tag
```
Select: BBCA
Expected: Shows "Finance" badge
Status: [ ]
```

#### Test Case 2.4: Current Price
```
Select: Any stock
Expected: Price in format "$X,XXX"
Status: [ ]
```

#### Test Case 2.5: Price Change (Positive)
```
Select: Stock with gain
Expected: Green color, ↑ arrow, +X.XX%
Status: [ ]
```

#### Test Case 2.6: Price Change (Negative)
```
Select: Stock with loss
Expected: Red color, ↓ arrow, -X.XX%
Status: [ ]
```

#### Test Case 2.7: Volume
```
Select: Any stock
Expected: Formatted with commas (e.g., "12,500,000")
Status: [ ]
```

#### Test Case 2.8: Market Cap
```
Select: Any stock
Expected: Formatted (e.g., "$1.2T" or "$500B")
Status: [ ]
```

#### Test Case 2.9: Day Range
```
Select: Any stock
Expected: Shows "X,XXX - X,XXX"
Status: [ ]
```

#### Test Case 2.10: 52-Week Range
```
Select: Any stock
Expected: Shows "X,XXX - X,XXX"
Status: [ ]
```

---

### 3. Chart Functionality

#### Test Case 3.1: Chart Renders
```
Select: Any stock
Expected: Chart displays with line
Status: [ ]
```

#### Test Case 3.2: Default Timeframe
```
Select: Any stock
Expected: 1M button is active (blue)
Status: [ ]
```

#### Test Case 3.3: Change Timeframe - 1D
```
Click: 1D button
Expected: Chart updates, shows 1 day data
Status: [ ]
```

#### Test Case 3.4: Change Timeframe - 5D
```
Click: 5D button
Expected: Chart updates, shows 5 days data
Status: [ ]
```

#### Test Case 3.5: Change Timeframe - 1M
```
Click: 1M button
Expected: Chart updates, shows 1 month data
Status: [ ]
```

#### Test Case 3.6: Change Timeframe - 3M
```
Click: 3M button
Expected: Chart updates, shows 3 months data
Status: [ ]
```

#### Test Case 3.7: Change Timeframe - 6M
```
Click: 6M button
Expected: Chart updates, shows 6 months data
Status: [ ]
```

#### Test Case 3.8: Change Timeframe - 1Y
```
Click: 1Y button
Expected: Chart updates, shows 1 year data
Status: [ ]
```

#### Test Case 3.9: Change Timeframe - 5Y
```
Click: 5Y button
Expected: Chart updates, shows 5 years data
Status: [ ]
```

#### Test Case 3.10: Hover Tooltip
```
Action: Hover over chart line
Expected: Tooltip shows date and price
Status: [ ]
```

#### Test Case 3.11: Prediction Line
```
Select: Any stock
Expected: Dashed amber line appears for predictions
Status: [ ]
```

#### Test Case 3.12: Chart Animation
```
Select: Any stock
Expected: Chart animates smoothly on load
Status: [ ]
```

---

### 4. AI Predictions

#### Test Case 4.1: 7-Day Prediction
```
Select: Any stock
Expected: Shows predicted price for 7 days
Status: [ ]
```

#### Test Case 4.2: 30-Day Prediction
```
Select: Any stock
Expected: Shows predicted price for 30 days
Status: [ ]
```

#### Test Case 4.3: 90-Day Prediction
```
Select: Any stock
Expected: Shows predicted price for 90 days
Status: [ ]
```

#### Test Case 4.4: Prediction Changes
```
Select: Any stock
Expected: Shows percentage change (green/red)
Status: [ ]
```

#### Test Case 4.5: Confidence Level
```
Select: Any stock
Expected: Shows High/Moderate/Low with percentage
Status: [ ]
```

#### Test Case 4.6: Key Factors
```
Select: Any stock
Expected: Shows 4-5 bullet points with emojis
Status: [ ]
```

#### Test Case 4.7: Disclaimer
```
Select: Any stock
Expected: Disclaimer visible at bottom
Status: [ ]
```

---

### 5. Responsive Design

#### Test Case 5.1: Mobile Portrait (375px)
```
Resize: 375px width
Expected: Single column, stacked layout
Status: [ ]
```

#### Test Case 5.2: Mobile Landscape (667px)
```
Resize: 667px width
Expected: Adjusted layout, readable
Status: [ ]
```

#### Test Case 5.3: Tablet Portrait (768px)
```
Resize: 768px width
Expected: Larger elements, good spacing
Status: [ ]
```

#### Test Case 5.4: Tablet Landscape (1024px)
```
Resize: 1024px width
Expected: Transitioning to desktop layout
Status: [ ]
```

#### Test Case 5.5: Desktop (1920px)
```
Resize: 1920px width
Expected: Two-column layout, max-width 1280px
Status: [ ]
```

#### Test Case 5.6: Touch Targets (Mobile)
```
Device: Mobile phone
Expected: All buttons at least 44x44px
Status: [ ]
```

---

### 6. Loading States

#### Test Case 6.1: Skeleton Loader
```
Action: Select a stock
Expected: Skeleton animation appears
Status: [ ]
```

#### Test Case 6.2: Skeleton to Content
```
Action: Wait for data load
Expected: Smooth transition to actual content
Status: [ ]
```

#### Test Case 6.3: Loading Duration
```
Action: Select a stock
Expected: Loads within 3 seconds
Status: [ ]
```

---

### 7. Error Handling

#### Test Case 7.1: API Error
```
Action: Disconnect internet, search stock
Expected: Error message appears
Status: [ ]
```

#### Test Case 7.2: Error Message Display
```
Action: Trigger error
Expected: Red banner at top with message
Status: [ ]
```

#### Test Case 7.3: Error Close Button
```
Action: Click × on error message
Expected: Error message disappears
Status: [ ]
```

#### Test Case 7.4: Error Auto-Dismiss
```
Action: Trigger error, wait 5 seconds
Expected: Error message auto-dismisses
Status: [ ]
```

---

### 8. Performance

#### Test Case 8.1: Initial Load Time
```
Action: Open app
Expected: Loads in < 3 seconds
Status: [ ]
```

#### Test Case 8.2: Search Response Time
```
Action: Type in search
Expected: Results appear in < 300ms
Status: [ ]
```

#### Test Case 8.3: Chart Render Time
```
Action: Select stock
Expected: Chart renders in < 1 second
Status: [ ]
```

#### Test Case 8.4: Timeframe Switch
```
Action: Click different timeframe
Expected: Updates in < 500ms
Status: [ ]
```

#### Test Case 8.5: Memory Usage
```
Action: Use app for 5 minutes
Expected: No memory leaks (check DevTools)
Status: [ ]
```

---

### 9. Browser Compatibility

#### Test Case 9.1: Chrome
```
Browser: Chrome (latest)
Expected: All features work
Status: [ ]
```

#### Test Case 9.2: Firefox
```
Browser: Firefox (latest)
Expected: All features work
Status: [ ]
```

#### Test Case 9.3: Safari
```
Browser: Safari (latest)
Expected: All features work
Status: [ ]
```

#### Test Case 9.4: Edge
```
Browser: Edge (latest)
Expected: All features work
Status: [ ]
```

#### Test Case 9.5: Mobile Safari
```
Browser: iOS Safari
Expected: All features work, touch-friendly
Status: [ ]
```

#### Test Case 9.6: Chrome Mobile
```
Browser: Android Chrome
Expected: All features work, touch-friendly
Status: [ ]
```

---

### 10. Accessibility

#### Test Case 10.1: Keyboard Navigation
```
Action: Use Tab key to navigate
Expected: Can access all interactive elements
Status: [ ]
```

#### Test Case 10.2: Focus Indicators
```
Action: Tab through elements
Expected: Clear focus outline visible
Status: [ ]
```

#### Test Case 10.3: Color Contrast
```
Tool: Use contrast checker
Expected: All text meets WCAG AA standards
Status: [ ]
```

#### Test Case 10.4: Screen Reader (Optional)
```
Tool: Use screen reader
Expected: Content is readable
Status: [ ]
```

---

## 🎯 Test Scenarios

### Scenario 1: First-Time User

**Steps:**
1. User opens app for first time
2. Sees search bar
3. Types "BBCA"
4. Clicks result
5. Views all information
6. Changes timeframe to 1Y
7. Reads predictions
8. Closes app

**Expected Result:**
- Smooth, intuitive experience
- No confusion
- All data displays correctly
- No errors

**Status:** [ ]

---

### Scenario 2: Quick Price Check

**Steps:**
1. User opens app
2. Quickly types stock code
3. Glances at current price
4. Closes app

**Expected Result:**
- Fast search
- Immediate price display
- Takes < 10 seconds

**Status:** [ ]

---

### Scenario 3: Detailed Analysis

**Steps:**
1. User searches stock
2. Reviews all details
3. Checks multiple timeframes
4. Compares predictions
5. Reads all factors
6. Takes notes

**Expected Result:**
- All data accurate
- Smooth transitions
- No lag or errors
- Takes ~2-3 minutes

**Status:** [ ]

---

### Scenario 4: Mobile Usage

**Steps:**
1. User opens on phone
2. Searches stock
3. Scrolls through info
4. Taps timeframe buttons
5. Views predictions
6. Closes app

**Expected Result:**
- Touch-friendly
- Readable on small screen
- No horizontal scroll
- Smooth scrolling

**Status:** [ ]

---

### Scenario 5: Error Recovery

**Steps:**
1. User searches invalid stock
2. Sees error message
3. Closes error
4. Searches valid stock
5. Views data successfully

**Expected Result:**
- Clear error message
- Easy to recover
- No app crash
- Continues working

**Status:** [ ]

---

## 🐛 Bug Report Template

If you find a bug, use this template:

```markdown
### Bug Report

**Title:** [Brief description]

**Severity:** Critical / High / Medium / Low

**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Screenshots:**
[If applicable]

**Environment:**
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Screen Size: [e.g., 1920x1080]

**Console Errors:**
[Copy from browser console]

**Additional Notes:**
[Any other relevant information]
```

---

## ✅ Testing Checklist Summary

### Critical Tests (Must Pass)
- [ ] Search works
- [ ] Stock data displays
- [ ] Chart renders
- [ ] Predictions show
- [ ] Mobile responsive
- [ ] No console errors

### Important Tests (Should Pass)
- [ ] All timeframes work
- [ ] Error handling works
- [ ] Loading states appear
- [ ] Animations smooth
- [ ] Touch-friendly on mobile

### Nice to Have (Can Pass)
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Perfect on all browsers
- [ ] Sub-second performance

---

## 📊 Test Results Template

```markdown
# Test Results - [Date]

## Summary
- Total Tests: XX
- Passed: XX
- Failed: XX
- Skipped: XX
- Pass Rate: XX%

## Critical Issues
1. [Issue 1]
2. [Issue 2]

## Minor Issues
1. [Issue 1]
2. [Issue 2]

## Recommendations
1. [Recommendation 1]
2. [Recommendation 2]

## Overall Status
✅ Ready for Production
⚠️ Needs Minor Fixes
❌ Needs Major Fixes
```

---

## 🚀 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All critical tests pass
- [ ] No console errors
- [ ] Tested on 3+ browsers
- [ ] Tested on mobile
- [ ] Tested on tablet
- [ ] Tested on desktop
- [ ] Error handling works
- [ ] Loading states work
- [ ] Performance acceptable
- [ ] Documentation complete

---

## 🎓 Testing Tips

### Tip 1: Use Browser DevTools
```
F12 → Console: Check for errors
F12 → Network: Check API calls
F12 → Performance: Check load times
F12 → Application: Check caching
```

### Tip 2: Test Edge Cases
- Very long stock names
- Stocks with no data
- Rapid clicking
- Slow internet
- No internet

### Tip 3: Test on Real Devices
- Don't just resize browser
- Test on actual phones/tablets
- Test different screen sizes
- Test touch interactions

### Tip 4: Test User Flows
- Think like a user
- Follow realistic scenarios
- Don't just test features
- Test complete workflows

---

## 📞 Need Help Testing?

- **Browser DevTools:** F12 or Right-click → Inspect
- **Mobile Testing:** Chrome DevTools → Toggle Device Toolbar
- **Performance:** Lighthouse in Chrome DevTools
- **Accessibility:** WAVE browser extension

---

**Happy Testing! 🧪**

*Remember: Good testing = Reliable app = Happy users*
