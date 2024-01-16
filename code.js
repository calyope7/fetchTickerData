// Need to get your API Key from alphavantage.co.  There are several packages available.  Free is limited to 25 API Requests per day

function StockOverview(ticker) {
  var apiKey = "yourAPIkeyhere";
  var url = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + ticker + "&apikey=" + apiKey;
  var response = UrlFetchApp.fetch(url);
  var data = JSON.parse(response.getContentText());

  // Extract relevant data
  var industry = data["Industry"];
  var sector = data["Sector"];
  var dividendYield = data["DividendYield"];
  var dividendDate = data["DividendDate"];
  
  // Return an array of values
  return [industry, sector, dividendYield, dividendDate];
  }

function fetchStockDataForList() {
  // Assuming the tickers are in column A starting from the second row
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var tickers = sheet.getRange("A2:A" + sheet.getLastRow()).getValues();

  // Loop through each ticker and fetch data
  for (var i = 0; i < tickers.length; i++) {
    var ticker = tickers[i][0]; // Assuming tickers are in a single column
    var stockData = StockOverview(ticker);

    // Write the data to the sheet starting from column B
    sheet.getRange(i + 2, 2, 1, stockData.length).setValues([stockData]);
  }
}
