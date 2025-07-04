export const serverConfig = {
  port: parseInt(process.env['PORT'] || '3000'),
  host: process.env['HOST'] || 'localhost',
  environment: process.env['NODE_ENV'] || 'development',
  cors: {
    origin: process.env['CORS_ORIGIN'] || 'http://localhost:3000',
    credentials: true,
  },
  rateLimit: {
    windowMs: parseInt(process.env['RATE_LIMIT_WINDOW_MS'] || '900000'),
    max: parseInt(process.env['RATE_LIMIT_MAX_REQUESTS'] || '100'),
  },
  jwt: {
    secret: process.env['JWT_SECRET'] || 'your-super-secret-jwt-key',
    expiresIn: process.env['JWT_EXPIRES_IN'] || '7d',
  },
}; 