/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';
import { stocksPlugin } from './plugin/stocks.plugin';

const init = async () => {
  const server = new Server({
    port: 3333,
    host: 'localhost'
  });

  server.cache.provision({
    provider: {
      constructor: require('@hapi/catbox-memory')
    },
    name: 'stock-details-cache'
  });

  await server.register(stocksPlugin);
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  process.exit(1);
});

init();
