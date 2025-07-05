import dotenv from 'dotenv';
import { app } from './app';
import { logger } from './utils/logger';
import { connectDatabase } from './data/database/connection';

// Load environment variables
dotenv.config();

const PORT = process.env['PORT'] || 3001;
const HOST = process.env['HOST'] || 'localhost';

async function startServer() {
  try {
    // Connect to database
    await connectDatabase();
    logger.info('Database connected successfully');

    // Start the server
    app.listen(PORT, () => {
      logger.info(`🚀 Contextually Personal AI server running on http://${HOST}:${PORT}`);
      logger.info(`📚 API Documentation available at http://${HOST}:${PORT}/api-docs`);
      logger.info(`🔍 Health check available at http://${HOST}:${PORT}/health`);
      logger.info(`🌍 Environment: ${process.env['NODE_ENV']}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the server
startServer(); 