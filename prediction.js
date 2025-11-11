// ===================================
// TECHNICAL ANALYSIS PREDICTION LOGIC
// ===================================

/**
 * Main prediction function using technical analysis indicators
 * Uses: Simple Moving Averages (SMA), Relative Strength Index (RSI), 
 * Momentum, and Volatility calculations
 * @param {Array} historicalData - Array of {date, price, volume} objects
 * @returns {Object} Prediction results with day7, day30, day90, confidence, trend, factors
 */
function predictStockPrice(historicalData) {
    const prices = historicalData.map(d => d.price);
    const currentPrice = prices[prices.length - 1];
    
    // Calculate Simple Moving Averages
    const sma10 = calculateSMA(prices, 10);
    const sma30 = calculateSMA(prices, 30);
    const sma50 = calculateSMA(prices, 50);
    
    // Determine trend
    const trend = sma10 > sma30 ? 'bullish' : 'bearish';
    const trendStrength = Math.abs(sma10 - sma30) / sma30;
    
    // Calculate volatility
    const returns = [];
    for (let i = 1; i < prices.length; i++) {
        returns.push((prices[i] - prices[i-1]) / prices[i-1]);
    }
    const volatility = calculateStandardDeviation(returns);
    
    // Calculate momentum
    const momentum = calculateMomentum(prices, 14);
    
    // Calculate RSI (Relative Strength Index)
    const rsi = calculateRSI(prices, 14);
    
    // Determine if overbought or oversold
    const isOverbought = rsi > 70;
    const isOversold = rsi < 30;
    
    // Calculate trend direction strength
    let trendMultiplier = 1;
    if (trend === 'bullish') {
        trendMultiplier = 1 + (trendStrength * 0.5);
        if (isOverbought) trendMultiplier *= 0.7; // Reduce if overbought
    } else {
        trendMultiplier = 1 - (trendStrength * 0.5);
        if (isOversold) trendMultiplier *= 1.3; // Potential reversal
    }
    
    // Make predictions based on trend, volatility, and momentum
    const baseChange7 = trend === 'bullish' ? 0.02 : -0.02;
    const baseChange30 = trend === 'bullish' ? 0.05 : -0.05;
    const baseChange90 = trend === 'bullish' ? 0.12 : -0.12;
    const baseChange180 = trend === 'bullish' ? 0.18 : -0.18;
    const baseChange365 = trend === 'bullish' ? 0.28 : -0.28;
    const baseChange730 = trend === 'bullish' ? 0.45 : -0.45;
    
    // Adjust predictions based on momentum and volatility
    const volatilityAdjustment = 1 + (volatility * 10); // Higher volatility = more movement
    const momentumAdjustment = momentum / 100; // Momentum influence
    
    const predictions = {
        day7: Math.round(currentPrice * (1 + (baseChange7 * trendStrength * volatilityAdjustment + momentumAdjustment * 0.1)) * 100) / 100,
        day30: Math.round(currentPrice * (1 + (baseChange30 * trendStrength * volatilityAdjustment + momentumAdjustment * 0.3)) * 100) / 100,
        day90: Math.round(currentPrice * (1 + (baseChange90 * trendStrength * volatilityAdjustment + momentumAdjustment * 0.5)) * 100) / 100,
        day180: Math.round(currentPrice * (1 + (baseChange180 * trendStrength * volatilityAdjustment + momentumAdjustment * 0.7)) * 100) / 100,
        day365: Math.round(currentPrice * (1 + (baseChange365 * trendStrength * volatilityAdjustment + momentumAdjustment * 0.9)) * 100) / 100,
        day730: Math.round(currentPrice * (1 + (baseChange730 * trendStrength * volatilityAdjustment + momentumAdjustment * 1.2)) * 100) / 100,
        confidence: determineConfidence(volatility, trendStrength, rsi),
        trend: trend,
        factors: generateFactors(trend, volatility, sma10, sma30, rsi, momentum)
    };
    
    return predictions;
}

// ===================================
// TECHNICAL INDICATORS
// ===================================

/**
 * Calculate Simple Moving Average
 * @param {Array} prices - Array of prices
 * @param {number} period - Period for SMA
 * @returns {number} SMA value
 */
function calculateSMA(prices, period) {
    if (prices.length < period) return prices[prices.length - 1];
    const slice = prices.slice(-period);
    return slice.reduce((sum, price) => sum + price, 0) / period;
}

/**
 * Calculate Standard Deviation
 * @param {Array} values - Array of values
 * @returns {number} Standard deviation
 */
function calculateStandardDeviation(values) {
    if (values.length === 0) return 0;
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
    const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
    return Math.sqrt(variance);
}

/**
 * Calculate Momentum
 * @param {Array} prices - Array of prices
 * @param {number} period - Period for momentum
 * @returns {number} Momentum value
 */
function calculateMomentum(prices, period) {
    if (prices.length < period) return 0;
    const currentPrice = prices[prices.length - 1];
    const pastPrice = prices[prices.length - period];
    return ((currentPrice - pastPrice) / pastPrice) * 100;
}

/**
 * Calculate RSI (Relative Strength Index)
 * @param {Array} prices - Array of prices
 * @param {number} period - Period for RSI (typically 14)
 * @returns {number} RSI value (0-100)
 */
function calculateRSI(prices, period = 14) {
    if (prices.length < period + 1) return 50; // Neutral if not enough data
    
    let gains = 0;
    let losses = 0;
    
    // Calculate initial average gain and loss
    for (let i = prices.length - period; i < prices.length; i++) {
        const change = prices[i] - prices[i - 1];
        if (change > 0) {
            gains += change;
        } else {
            losses += Math.abs(change);
        }
    }
    
    const avgGain = gains / period;
    const avgLoss = losses / period;
    
    if (avgLoss === 0) return 100; // All gains
    
    const rs = avgGain / avgLoss;
    const rsi = 100 - (100 / (1 + rs));
    
    return rsi;
}

/**
 * Calculate Exponential Moving Average
 * @param {Array} prices - Array of prices
 * @param {number} period - Period for EMA
 * @returns {number} EMA value
 */
function calculateEMA(prices, period) {
    if (prices.length < period) return calculateSMA(prices, prices.length);
    
    const multiplier = 2 / (period + 1);
    let ema = calculateSMA(prices.slice(0, period), period);
    
    for (let i = period; i < prices.length; i++) {
        ema = (prices[i] - ema) * multiplier + ema;
    }
    
    return ema;
}

// ===================================
// CONFIDENCE & FACTORS
// ===================================

/**
 * Determine confidence level based on various factors
 * @param {number} volatility - Price volatility
 * @param {number} trendStrength - Strength of the trend
 * @param {number} rsi - RSI value
 * @returns {string} Confidence level description
 */
function determineConfidence(volatility, trendStrength, rsi) {
    let confidenceScore = 0;
    
    // Low volatility increases confidence
    if (volatility < 0.02) {
        confidenceScore += 30;
    } else if (volatility < 0.04) {
        confidenceScore += 20;
    } else {
        confidenceScore += 10;
    }
    
    // Strong trend increases confidence
    if (trendStrength > 0.05) {
        confidenceScore += 30;
    } else if (trendStrength > 0.02) {
        confidenceScore += 20;
    } else {
        confidenceScore += 10;
    }
    
    // RSI in normal range increases confidence
    if (rsi >= 30 && rsi <= 70) {
        confidenceScore += 25;
    } else {
        confidenceScore += 15;
    }
    
    // Additional base confidence
    confidenceScore += 15;
    
    if (confidenceScore >= 75) {
        return 'High (75-85%)';
    } else if (confidenceScore >= 60) {
        return 'Moderate (60-75%)';
    } else {
        return 'Low (45-60%)';
    }
}

/**
 * Generate human-readable factors affecting the prediction
 * @param {string} trend - Bullish or bearish
 * @param {number} volatility - Price volatility
 * @param {number} sma10 - 10-day SMA
 * @param {number} sma30 - 30-day SMA
 * @param {number} rsi - RSI value
 * @param {number} momentum - Momentum value
 * @returns {Array} Array of factor descriptions
 */
function generateFactors(trend, volatility, sma10, sma30, rsi, momentum) {
    const factors = [];
    
    // Trend factor
    if (trend === 'bullish') {
        factors.push('📈 Positive momentum detected - upward price trend');
    } else {
        factors.push('📉 Negative momentum detected - downward price trend');
    }
    
    // Volatility factor
    if (volatility < 0.02) {
        factors.push('🎯 Low price volatility - stable price movement');
    } else if (volatility < 0.04) {
        factors.push('⚖️ Moderate price volatility - normal fluctuations');
    } else {
        factors.push('⚠️ High price volatility - significant price swings');
    }
    
    // Moving average factor
    if (sma10 > sma30) {
        factors.push('✅ Short-term average above long-term (bullish signal)');
    } else {
        factors.push('❌ Short-term average below long-term (bearish signal)');
    }
    
    // RSI factor
    if (rsi > 70) {
        factors.push('🔴 RSI indicates overbought conditions - potential pullback');
    } else if (rsi < 30) {
        factors.push('🟢 RSI indicates oversold conditions - potential bounce');
    } else {
        factors.push('⚪ RSI in neutral zone - balanced buying/selling');
    }
    
    // Momentum factor
    if (Math.abs(momentum) > 5) {
        if (momentum > 0) {
            factors.push('🚀 Strong positive momentum - accelerating gains');
        } else {
            factors.push('⬇️ Strong negative momentum - accelerating losses');
        }
    } else {
        factors.push('➡️ Weak momentum - sideways price action');
    }
    
    return factors;
}

// ===================================
// ADVANCED PREDICTION (Optional)
// ===================================

/**
 * Advanced prediction using multiple timeframes
 * @param {Array} historicalData - Historical price data
 * @returns {Object} Enhanced prediction results
 */
function advancedPrediction(historicalData) {
    const prices = historicalData.map(d => d.price);
    
    // Multiple timeframe analysis
    const shortTerm = calculateSMA(prices, 10);
    const mediumTerm = calculateSMA(prices, 30);
    const longTerm = calculateSMA(prices, 50);
    
    // Trend alignment
    const trendAlignment = (shortTerm > mediumTerm && mediumTerm > longTerm) ? 'strong_bullish' :
                          (shortTerm < mediumTerm && mediumTerm < longTerm) ? 'strong_bearish' :
                          'mixed';
    
    // Volume analysis
    const volumes = historicalData.map(d => d.volume);
    const avgVolume = volumes.reduce((a, b) => a + b, 0) / volumes.length;
    const recentVolume = volumes.slice(-5).reduce((a, b) => a + b, 0) / 5;
    const volumeTrend = recentVolume > avgVolume * 1.2 ? 'increasing' : 
                        recentVolume < avgVolume * 0.8 ? 'decreasing' : 'stable';
    
    return {
        trendAlignment,
        volumeTrend,
        shortTerm,
        mediumTerm,
        longTerm
    };
}

// ===================================
// EXPORT FOR TESTING
// ===================================

// Make functions available globally for testing
if (typeof window !== 'undefined') {
    window.predictStockPrice = predictStockPrice;
    window.calculateSMA = calculateSMA;
    window.calculateRSI = calculateRSI;
    window.calculateMomentum = calculateMomentum;
}
