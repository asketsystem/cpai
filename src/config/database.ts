export const databaseConfig = {
  mongodb: {
    uri: process.env['MONGODB_URI'] || 'mongodb://localhost:27017/contextually-personal-ai',
    options: {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
    },
  },
  redis: {
    url: process.env['REDIS_URL'] || 'redis://localhost:6379',
    password: process.env['REDIS_PASSWORD'],
    db: parseInt(process.env['REDIS_DB'] || '0'),
  },
}; 