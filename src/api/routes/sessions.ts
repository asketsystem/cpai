import { Router } from 'express';
import { SessionController } from '../controllers/session.controller';

const router = Router();
const sessionController = new SessionController();

// Session management routes
router.get('/', sessionController.getAllSessions);
router.get('/:id', sessionController.getSessionById);
router.post('/', sessionController.createSession);
router.put('/:id', sessionController.updateSession);
router.delete('/:id', sessionController.deleteSession);

// Session analytics routes
router.get('/:id/analytics', sessionController.getSessionAnalytics);
router.get('/user/:userId/sessions', sessionController.getUserSessions);

// Context management routes
router.get('/:id/context', sessionController.getSessionContext);
router.put('/:id/context', sessionController.updateSessionContext);

export default router; 