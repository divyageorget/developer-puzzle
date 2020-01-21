import { StocksService } from './stocks.service';
import { STOCKAPICONSTANTS } from './stocks.api.constants';

const pluginName = STOCKAPICONSTANTS.STOCKSPLUGIN;
export const stocksPlugin = {
  name: pluginName,
  version: STOCKAPICONSTANTS.VERSION,
  register: async function(server) {
    const getStockDetails = async (
      symbol: String,
      period: String,
      token: String
    ) => {
      return StocksService.getStockDetails(symbol, period, token);
    };

    server.method(STOCKAPICONSTANTS.STOCK_DETAILS, getStockDetails, {
      cache: {
        cache: STOCKAPICONSTANTS.STOCK_DETAILS_CACHE,
        expiresIn: STOCKAPICONSTANTS.EXPIRY_TIME,
        generateTimeout: STOCKAPICONSTANTS.TIMEOUT
      }
    });

    server.route({
      method: STOCKAPICONSTANTS.GET,
      path: STOCKAPICONSTANTS.PATH,
      options: {
        handler: async function(request) {
          try {
            const { symbol, period, token } = request.params;
            return await server.methods.stockDetails(symbol, period, token);
          } catch (error) {
            return error;
          }
        }
      }
    });
  }
};
