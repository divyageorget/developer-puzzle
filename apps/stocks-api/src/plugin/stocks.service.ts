import { STOCKAPICONSTANTS } from './stocks.api.constants';

export class StocksService {
  static async getStockDetails(symbol: String, period: String, token: String) {
    const Wreck = require('@hapi/wreck');
    const wreck = Wreck.defaults({
      timeout: STOCKAPICONSTANTS.TIMEOUT
    });

    const { response, payload } = await wreck.get(
      `${STOCKAPICONSTANTS.APIURI}/${symbol}/chart/${period}?token=${token}`
    );
    return payload;
  }
}
