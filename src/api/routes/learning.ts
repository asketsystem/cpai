import { Router } from 'express';
import { LearningController } from '../controllers/learning.controller';

const router = Router();
const learningController = new LearningController();

// Learning content routes
router.get('/content', learningController.getContent);
router.get('/content/:id', learningController.getContentById);
router.post('/content', learningController.createContent);

// Learning sessions routes
router.get('/sessions', learningController.getLearningSessions);
router.get('/sessions/:id', learningController.getLearningSessionById);
router.post('/sessions', learningController.createLearningSession);
router.put('/sessions/:id', learningController.updateLearningSession);

// AI interaction routes
router.post('/chat', learningController.chatWithAI);
router.post('/tutor', learningController.getTutorResponse);
router.post('/assessment', learningController.generateAssessment);

// Progress tracking routes
router.get('/progress/:userId', learningController.getUserProgress);
router.post('/progress', learningController.updateProgress);

// Offline content routes
router.get('/offline/:contentId', learningController.getOfflineContent);
router.post('/sync', learningController.syncOfflineData);

// Advanced Adaptation Models - Phase 4
router.post('/offline-content', learningController.generateOfflineContent.bind(learningController));
router.post('/compress-content', learningController.compressContent.bind(learningController));
router.post('/adapt-content', learningController.adaptContent.bind(learningController));

export default router; 