const STOCKAPICONSTANTS = {
  STOCKSPLUGIN: 'stocksPlugin',
  VERSION: '1.0.0',
  STOCK_DETAILS: 'stockDetails',
  STOCK_DETAILS_CACHE: 'stock-details-cache',
  EXPIRY_TIME: 60 * 1000,
  TIMEOUT: 5000,
  GET: 'GET',
  PATH: '/api/v1/stock/{symbol}/{period}/{token}',
  APIURI: 'https://sandbox.iexapis.com/beta/stock'
};

export { STOCKAPICONSTANTS };
