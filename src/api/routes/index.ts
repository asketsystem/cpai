import { Router } from 'express';
import userRoutes from './users';
import learningRoutes from './learning';
import sessionRoutes from './sessions';

const router = Router();

// API version prefix
const API_VERSION = process.env['API_VERSION'] || 'v1';
const API_PREFIX = process.env['API_PREFIX'] || '/api';

// Health check route
router.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'Contextually Personal AI API',
    version: API_VERSION,
    timestamp: new Date().toISOString(),
  });
});

// API routes
router.use('/users', userRoutes);
router.use('/learning', learningRoutes);
router.use('/sessions', sessionRoutes);

// API info route
router.get('/', (_req, res) => {
  res.json({
    message: 'Contextually Personal AI API',
    version: API_VERSION,
    endpoints: {
      users: `${API_PREFIX}/users`,
      learning: `${API_PREFIX}/learning`,
      sessions: `${API_PREFIX}/sessions`,
      health: `${API_PREFIX}/health`,
      docs: '/api-docs',
    },
    timestamp: new Date().toISOString(),
  });
});

export { router as apiRoutes }; 