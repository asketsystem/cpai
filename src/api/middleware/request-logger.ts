import { Request, Response, NextFunction } from 'express';
import { logger } from '../../utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();

  // Log request
  logger.info(`Incoming ${req.method} request to ${req.originalUrl}`, {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString(),
  });

  // Override res.end to log response
  const originalEnd = res.end;
  res.end = function(chunk?: any, encoding?: any): Response {
    const duration = Date.now() - start;
    
    logger.info(`Outgoing ${req.method} response from ${req.originalUrl}`, {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });

    return originalEnd.call(this, chunk, encoding);
  };

  next();
}; 