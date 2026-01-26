/* eslint-disable @typescript-eslint/no-explicit-any */
import app from './app';
import { config } from './config';
import { logger } from './middlewares/logger';


// Start server
const main = async () => {
  try {
    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });
  } catch (err) {
    logger.error('Failed to start server:', err);
    process.exit(1); // Exit if server fails to start
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception! 💥 Shutting down...');
  logger.error(err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: any) => {
  logger.error('Unhandled Rejection! 💥 Shutting down...');
  logger.error(err);
  process.exit(1);
});

main();
