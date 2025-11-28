export interface PsxTask {
  id: number;
  title: string;
  description: string;
  category: string;
  code: string;
}

export const psxTasks: PsxTask[] = [
  // A. Data Collection & Cleaning
  {
    id: 1,
    category: "A. Data Collection & Cleaning",
    title: "Download PSX daily price data",
    description: "Download PSX daily price data for 5–20 companies (CSV/Excel).",
    code: `# Install necessary libraries
!pip install pandas yfinance psx-data-reader

import pandas as pd
from psx import stocks

# Option 1: Using psx-data-reader (if available and maintained)
# This library is specifically designed for PSX data
try:
    tickers = ["LUCK", "ENGRO", "OGDC", "TRG", "SYS"]
    data = stocks(tickers, start="2023-01-01", end="2023-12-31")
    print("Data downloaded successfully via psx library")
    print(data.head())
except Exception as e:
    print(f"PSX library error: {e}")
    print("Falling back to Yahoo Finance (Note: Tickers might need suffix .KA or .PA)")

# Option 2: Using Yahoo Finance (Common alternative)
# PSX stocks on Yahoo Finance usually have .PA suffix
import yfinance as yf

psx_tickers = ["LUCK.PA", "ENGRO.PA", "OGDC.PA", "TRG.PA", "SYS.PA"]
df = yf.download(psx_tickers, start="2023-01-01", end="2023-12-31")

print("\nYahoo Finance Data:")
print(df.head())

# Save to CSV for later use
df.to_csv("psx_stock_data.csv")`
  },
  {
    id: 2,
    category: "A. Data Collection & Cleaning",
    title: "Clean missing values and outliers",
    description: "Clean missing values, outliers, duplicate rows, and incorrect dates.",
    code: `import pandas as pd
import numpy as np

# Load data
df = pd.read_csv("psx_stock_data.csv", header=[0, 1], index_col=0)

# 1. Check for missing values
print("Missing values before cleaning:")
print(df.isnull().sum())

# Fill missing values (Forward fill is common for time series)
df_clean = df.ffill().bfill()

# 2. Remove duplicates
df_clean = df_clean.drop_duplicates()

# 3. Handle Outliers (Simple Z-Score method)
# Calculate Z-scores for 'Close' prices
from scipy import stats
import numpy as np

# Example for one column level if multi-index
# close_prices = df_clean.xs('Close', level=0, axis=1)
# z_scores = np.abs(stats.zscore(close_prices))
# df_no_outliers = close_prices[(z_scores < 3).all(axis=1)]

print("Data cleaning complete.")
print(df_clean.info())`
  },
  {
    id: 4,
    category: "A. Data Collection & Cleaning",
    title: "Merge stock price data with sector data",
    description: "Merge stock price data with sector data and KSE100 index.",
    code: `import pandas as pd

# Mock Sector Data
sectors = {
    "LUCK.PA": "Cement",
    "ENGRO.PA": "Fertilizer",
    "OGDC.PA": "Oil & Gas",
    "TRG.PA": "Technology",
    "SYS.PA": "Technology"
}

# Convert to DataFrame
sector_df = pd.DataFrame(list(sectors.items()), columns=['Ticker', 'Sector'])

# Load KSE100 Index Data
kse100 = yf.download("^KSE100", start="2023-01-01", end="2023-12-31")
kse100['Ticker'] = 'KSE100'

print("Sector Data:")
print(sector_df)
print("\nKSE100 Data:")
print(kse100.head())

# Merging logic would depend on your data structure (Long vs Wide format)
# If your stock data is in 'Long' format:
# merged_df = pd.merge(stock_data, sector_df, on='Ticker')`
  },

  // B. Descriptive Analytics
  {
    id: 7,
    category: "B. Descriptive Analytics",
    title: "Compute daily returns",
    description: "Compute daily, weekly, monthly, and annual returns.",
    code: `import pandas as pd
import matplotlib.pyplot as plt

# Assuming df contains Close prices
# If MultiIndex columns from yfinance:
close_prices = df.xs('Close', level=0, axis=1)

# 1. Daily Returns
daily_returns = close_prices.pct_change()

# 2. Weekly Returns (Resample to Weekly and take last price, then pct_change)
weekly_returns = close_prices.resample('W').last().pct_change()

# 3. Monthly Returns
monthly_returns = close_prices.resample('M').last().pct_change()

# 4. Annual Returns
annual_returns = close_prices.resample('A').last().pct_change()

print("Daily Returns Head:")
print(daily_returns.head())

# Visualize Daily Returns of one stock
plt.figure(figsize=(10, 6))
daily_returns.iloc[:, 0].hist(bins=50, alpha=0.7, color='blue')
plt.title(f"Daily Returns Histogram: {daily_returns.columns[0]}")
plt.xlabel("Return")
plt.ylabel("Frequency")
plt.show()`
  },
  {
    id: 8,
    category: "B. Descriptive Analytics",
    title: "Calculate volatility per script",
    description: "Calculate annualized volatility (Standard Deviation).",
    code: `import numpy as np

# Calculate daily standard deviation
daily_volatility = daily_returns.std()

# Annualize it (assuming 252 trading days)
annualized_volatility = daily_volatility * np.sqrt(252)

print("Annualized Volatility per Stock:")
print(annualized_volatility.sort_values(ascending=False))`
  },
  {
    id: 12,
    category: "B. Descriptive Analytics",
    title: "Create rolling mean and std",
    description: "Calculate rolling mean (SMA) and rolling standard deviation.",
    code: `# Select one stock
stock_symbol = close_prices.columns[0]
stock_series = close_prices[stock_symbol]

# Calculate 20-day Rolling Mean (SMA)
rolling_mean = stock_series.rolling(window=20).mean()

# Calculate 20-day Rolling Std
rolling_std = stock_series.rolling(window=20).std()

# Plotting
plt.figure(figsize=(12, 6))
plt.plot(stock_series, label='Price', alpha=0.5)
plt.plot(rolling_mean, label='20-Day SMA', color='orange')
plt.plot(rolling_mean + 2*rolling_std, label='Upper Band', linestyle='--', color='grey')
plt.plot(rolling_mean - 2*rolling_std, label='Lower Band', linestyle='--', color='grey')
plt.title(f"{stock_symbol} - Price with Bollinger Bands proxy")
plt.legend()
plt.show()`
  },

  // C. Visualization Tasks
  {
    id: 13,
    category: "C. Visualization Tasks",
    title: "Plot line charts for trends",
    description: "Plot line charts for price trends using Matplotlib/Seaborn.",
    code: `import matplotlib.pyplot as plt
import seaborn as sns

# Set style
sns.set_theme(style="darkgrid")

plt.figure(figsize=(14, 7))
for column in close_prices.columns:
    plt.plot(close_prices.index, close_prices[column], label=column)

plt.title("PSX Stock Price Trends (2023)", fontsize=16)
plt.xlabel("Date")
plt.ylabel("Price (PKR)")
plt.legend()
plt.show()`
  },
  {
    id: 14,
    category: "C. Visualization Tasks",
    title: "Create candlestick charts",
    description: "Create candlestick charts using Plotly (Interactive).",
    code: `!pip install plotly

import plotly.graph_objects as go

# Get data for one stock (ensure we have Open, High, Low, Close)
# Re-downloading single ticker for clarity
ticker = "LUCK.PA"
stock_data = yf.download(ticker, start="2023-06-01", end="2023-12-31")

# Note: yfinance might return MultiIndex columns
if isinstance(stock_data.columns, pd.MultiIndex):
    stock_data.columns = stock_data.columns.get_level_values(0)

fig = go.Figure(data=[go.Candlestick(x=stock_data.index,
                open=stock_data['Open'],
                high=stock_data['High'],
                low=stock_data['Low'],
                close=stock_data['Close'])])

fig.update_layout(
    title=f'{ticker} Candlestick Chart',
    yaxis_title='Price (PKR)',
    xaxis_title='Date',
    template='plotly_dark'
)

fig.show()`
  },
  {
    id: 17,
    category: "C. Visualization Tasks",
    title: "Generate heatmaps for correlation",
    description: "Generate heatmaps for correlation/sector performance.",
    code: `import seaborn as sns

# Calculate Correlation Matrix
corr_matrix = daily_returns.corr()

plt.figure(figsize=(10, 8))
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', vmin=-1, vmax=1)
plt.title("Stock Correlation Heatmap")
plt.show()`
  },

  // D. Statistical Analytics
  {
    id: 21,
    category: "D. Statistical Analytics",
    title: "Calculate Beta relative to KSE100",
    description: "Calculate Beta relative to KSE100.",
    code: `# Download KSE100 data
market_data = yf.download("^KSE100", start="2023-01-01", end="2023-12-31")['Close']
market_returns = market_data.pct_change().dropna()

# Align data
stock_returns = daily_returns['LUCK.PA'].dropna() # Example stock
# Ensure indices match
common_dates = stock_returns.index.intersection(market_returns.index)
stock_returns = stock_returns.loc[common_dates]
market_returns = market_returns.loc[common_dates]

# Calculate Beta
covariance = stock_returns.cov(market_returns)
market_variance = market_returns.var()
beta = covariance / market_variance

print(f"Beta for LUCK.PA: {beta:.4f}")`
  },

  // E. Technical Indicators
  {
    id: 26,
    category: "E. Technical Indicators",
    title: "Calculate RSI indicator",
    description: "Calculate Relative Strength Index (RSI).",
    code: `!pip install pandas_ta

import pandas_ta as ta

# Use the DataFrame 'df' downloaded earlier (single stock preferred for clarity)
df_single = df.xs('LUCK.PA', level=1, axis=1).copy()

# Calculate RSI
df_single['RSI'] = ta.rsi(df_single['Close'], length=14)

# Plot
plt.figure(figsize=(14, 5))
plt.plot(df_single.index, df_single['RSI'], label='RSI (14)', color='purple')
plt.axhline(70, linestyle='--', alpha=0.5, color='red')
plt.axhline(30, linestyle='--', alpha=0.5, color='green')
plt.title("Relative Strength Index (RSI)")
plt.legend()
plt.show()`
  },
  {
    id: 27,
    category: "E. Technical Indicators",
    title: "Apply MACD indicator",
    description: "Apply Moving Average Convergence Divergence (MACD).",
    code: `# Calculate MACD
macd = ta.macd(df_single['Close'])
df_single = pd.concat([df_single, macd], axis=1)

# Columns generated: MACD_12_26_9, MACDh_12_26_9 (Histogram), MACDs_12_26_9 (Signal)
print(df_single.tail())

# Plot MACD
plt.figure(figsize=(14, 6))
plt.plot(df_single.index, df_single['MACD_12_26_9'], label='MACD Line')
plt.plot(df_single.index, df_single['MACDs_12_26_9'], label='Signal Line', color='orange')
plt.bar(df_single.index, df_single['MACDh_12_26_9'], label='Histogram', color='gray', alpha=0.3)
plt.title("MACD Indicator")
plt.legend()
plt.show()`
  },

  // F. Machine Learning
  {
    id: 31,
    category: "F. Machine Learning & Predictive Analytics",
    title: "Forecast prices using ARIMA",
    description: "Forecast prices using ARIMA model.",
    code: `from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_squared_error

# Split data
train_data = list(df_single['Close'][:-30])
test_data = list(df_single['Close'][-30:])

# Fit ARIMA Model (Order p,d,q needs tuning, using 5,1,0 as example)
model = ARIMA(train_data, order=(5,1,0))
model_fit = model.fit()

# Forecast
output = model_fit.forecast(steps=30)
predictions = list(output)

# Plot results
plt.figure(figsize=(12, 6))
plt.plot(test_data, color='blue', label='Actual Price')
plt.plot(predictions, color='red', linestyle='--', label='Predicted Price')
plt.title("ARIMA Price Forecast vs Actual")
plt.legend()
plt.show()`
  },
  {
    id: 32,
    category: "F. Machine Learning & Predictive Analytics",
    title: "Build Prophet forecasting model",
    description: "Build Prophet forecasting model (Facebook Prophet).",
    code: `!pip install prophet

from prophet import Prophet

# Prepare DataFrame for Prophet (needs 'ds' and 'y' columns)
prophet_df = df_single.reset_index()[['Date', 'Close']]
prophet_df.columns = ['ds', 'y']

# Initialize and Fit
m = Prophet()
m.fit(prophet_df)

# Create future dataframe
future = m.make_future_dataframe(periods=365)
forecast = m.predict(future)

# Plot
fig1 = m.plot(forecast)
plt.title("Prophet Forecast")
plt.show()

fig2 = m.plot_components(forecast)
plt.show()`
  },

  // G. Portfolio Analytics
  {
    id: 39,
    category: "G. Portfolio Analytics & Finance",
    title: "Build efficient frontier",
    description: "Build efficient frontier for portfolio optimization.",
    code: `!pip install PyPortfolioOpt

from pypfopt.efficient_frontier import EfficientFrontier
from pypfopt import risk_models
from pypfopt import expected_returns

# Use 'close_prices' DataFrame with multiple stocks
mu = expected_returns.mean_historical_return(close_prices)
S = risk_models.sample_cov(close_prices)

# Optimize for maximal Sharpe ratio
ef = EfficientFrontier(mu, S)
weights = ef.max_sharpe()
cleaned_weights = ef.clean_weights()

print("Optimal Weights for Max Sharpe Ratio:")
print(cleaned_weights)

ef.portfolio_performance(verbose=True)`
  },

  // I. Reporting
  {
    id: 56,
    category: "I. Reporting",
    title: "Create automated PDF reports",
    description: "Create automated PDF reports in Python using FPDF.",
    code: `!pip install fpdf

from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, 'PSX Daily Analytics Report', 0, 1, 'C')

    def footer(self):
        self.set_position(0, -15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

pdf = PDF()
pdf.add_page()
pdf.set_font("Arial", size=12)

# Add Text
pdf.cell(200, 10, txt="Market Summary:", ln=1, align='L')
pdf.multi_cell(0, 10, txt=f"The top performing stock today was X with a return of Y%.\\nVolatility remains high in the Tech sector.")

# Add Image (Save a plot first)
# plt.savefig('chart.png')
# pdf.image('chart.png', x=10, y=50, w=190)

# Save PDF
pdf.output("PSX_Report.pdf")
print("PDF Report generated successfully.")`
  }
];

export const categories = Array.from(new Set(psxTasks.map(t => t.category)));
