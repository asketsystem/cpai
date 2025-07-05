import { Router } from 'express';
import { AIEngine } from '../../core/ai-engine';
import { LearningModelsController } from '../controllers/learning-models.controller';

const router = Router();
const aiEngine = new AIEngine();
const controller = new LearningModelsController(aiEngine);

// Phase 1 endpoints
router.post('/integrated', controller.generateIntegratedLearning.bind(controller));
router.post('/visual', controller.generateVisualContent.bind(controller));
router.post('/assessment', controller.generateAssessment.bind(controller));
router.post('/tutoring', controller.generateTutoringResponse.bind(controller));

// Phase 2 accessibility endpoints
router.post('/screen-reader', controller.generateScreenReaderContent.bind(controller));
router.post('/captions', controller.generateCaptions.bind(controller));
router.post('/mobile-optimize', controller.optimizeMobileContent.bind(controller));

// Phase 3 engagement endpoints
router.post('/gamification', controller.generateGamification.bind(controller));
router.post('/motivation', controller.generateMotivation.bind(controller));
router.post('/localize', controller.localizeContent.bind(controller));

// Model stats/config
router.get('/stats', controller.getModelStats.bind(controller));
router.get('/config', controller.getConfig.bind(controller));
router.put('/config', controller.updateConfig.bind(controller));
router.get('/phase1-status', controller.getPhase1Status.bind(controller));

export default router; 