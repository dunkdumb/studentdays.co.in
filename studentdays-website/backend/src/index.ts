import { createServer } from './server';
import { config } from './config';

const app = createServer();

const server = app.listen(config.port, () => {
  console.log(`===================================================`);
  console.log(` StudentDays.co Backend API Server Active`);
  console.log(` URL: http://localhost:${config.port}`);
  console.log(` API Prefix: ${config.apiPrefix}`);
  console.log(` Health Endpoint: http://localhost:${config.port}${config.apiPrefix}/health`);
  console.log(` Payment Mode: ${config.paymentMode}`);
  console.log(` Storage Mode: ${config.storageMode}`);
  console.log(`===================================================`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server gracefully.');
  server.close(() => {
    process.exit(0);
  });
});
