import { Request, Response } from 'express';
import { AIEngine } from '../../core/ai-engine';
import { IntegratedLearningRequest, LearningModelsConfig } from '../../core/learning-models';

export class LearningModelsController {
  private aiEngine: AIEngine;

  constructor(aiEngine: AIEngine) {
    this.aiEngine = aiEngine;
  }

  /**
   * Generate integrated learning content
   */
  async generateIntegratedLearning(req: Request, res: Response): Promise<void> {
    try {
      const {
        topic,
        learningObjective,
        userId,
        context,
        personal
      } = req.body;

      // Validate required fields
      if (!topic || !learningObjective || !userId) {
        res.status(400).json({
          success: false,
          error: 'Missing required fields: topic, learningObjective, userId'
        });
        return;
      }

      // Validate learning objective
      const validObjectives = ['understand', 'practice', 'assess', 'review'];
      if (!validObjectives.includes(learningObjective)) {
        res.status(400).json({
          success: false,
          error: `Invalid learningObjective. Must be one of: ${validObjectives.join(', ')}`
        });
        return;
      }

      // Generate integrated learning content
      const response = await this.aiEngine.generateIntegratedLearning(
        topic,
        learningObjective,
        userId,
        context,
        personal
      );

      res.status(200).json({
        success: true,
        data: response
      });
    } catch (error) {
      console.error('Error generating integrated learning:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to generate integrated learning content'
      });
    }
  }

  /**
   * Generate visual learning content
   */
  async generateVisualContent(req: Request, res: Response): Promise<void> {
    try {
      const {
        topic,
        learningStyle,
        difficulty,
        context,
        preferences
      } = req.body;

      // Validate required fields
      if (!topic || !learningStyle || !difficulty) {
        res.status(400).json({
          success: false,
          error: 'Missing required fields: topic, learningStyle, difficulty'
        });
        return;
      }

      // Create integrated learning request focused on visual content
      const request: IntegratedLearningRequest = {
        topic,
        learningObjective: 'understand',
        userContext: {
          userId: req.body.userId || 'anonymous',
          currentLevel: difficulty,
          learningStyle,
          progress: 0,
          strengths: [],
          weaknesses: []
        },
        context: {
          location: context?.location || 'Unknown',
          culturalContext: context?.culturalContext || 'West African',
          language: context?.language || 'en',
          deviceType: context?.deviceType || 'desktop',
          bandwidth: context?.bandwidth || 'medium',
          timeAvailable: 30
        },
        preferences: {
          includeVisuals: true,
          includeAssessments: false,
          includeTutoring: false,
          detailLevel: preferences?.detailLevel || 'moderate',
          responseStyle: 'guided'
        }
      };

      const response = await this.aiEngine.generateIntegratedLearning(
        topic,
        'understand',
        request.userContext.userId,
        context,
        undefined
      );

      res.status(200).json({
        success: true,
        data: {
          visualContent: response.content.visualContent,
          metadata: response.metadata
        }
      });
    } catch (error) {
      console.error('Error generating visual content:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to generate visual content'
      });
    }
  }

  /**
   * Generate assessment
   */
  async generateAssessment(req: Request, res: Response): Promise<void> {
    try {
      const {
        topic,
        difficulty,
        userLevel,
        context
      } = req.body;

      // Validate required fields
      if (!topic || !difficulty || !userLevel) {
        res.status(400).json({
          success: false,
          error: 'Missing required fields: topic, difficulty, userLevel'
        });
        return;
      }

      // Create integrated learning request focused on assessment
      const request: IntegratedLearningRequest = {
        topic,
        learningObjective: 'assess',
        userContext: {
          userId: req.body.userId || 'anonymous',
          currentLevel: userLevel.currentLevel,
          learningStyle: userLevel.learningStyle,
          progress: userLevel.progress || 0,
          strengths: userLevel.strengths || [],
          weaknesses: userLevel.weaknesses || []
        },
        context: {
          location: context?.location || 'Unknown',
          culturalContext: context?.culturalContext || 'West African',
          language: context?.language || 'en',
          deviceType: context?.deviceType || 'desktop',
          bandwidth: context?.bandwidth || 'medium',
          timeAvailable: context?.timeAvailable || 30
        },
        preferences: {
          includeVisuals: false,
          includeAssessments: true,
          includeTutoring: false,
          detailLevel: 'moderate',
          responseStyle: 'direct'
        }
      };

      const response = await this.aiEngine.generateIntegratedLearning(
        topic,
        'assess',
        request.userContext.userId,
        context,
        undefined
      );

      res.status(200).json({
        success: true,
        data: {
          assessment: response.content.assessment,
          metadata: response.metadata
        }
      });
    } catch (error) {
      console.error('Error generating assessment:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to generate assessment'
      });
    }
  }

  /**
   * Generate tutoring response
   */
  async generateTutoringResponse(req: Request, res: Response): Promise<void> {
    try {
      const {
        question,
        topic,
        userContext,
        context,
        preferences
      } = req.body;

      // Validate required fields
      if (!question || !topic || !userContext) {
        res.status(400).json({
          success: false,
          error: 'Missing required fields: question, topic, userContext'
        });
        return;
      }

      // Create integrated learning request focused on tutoring
      const request: IntegratedLearningRequest = {
        topic,
        learningObjective: 'understand',
        userContext: {
          userId: userContext.userId || 'anonymous',
          currentLevel: userContext.currentLevel,
          learningStyle: userContext.learningStyle,
          progress: userContext.progress || 0,
          strengths: userContext.strengths || [],
          weaknesses: userContext.weaknesses || []
        },
        context: {
          location: context?.location || 'Unknown',
          culturalContext: context?.culturalContext || 'West African',
          language: context?.language || 'en',
          deviceType: context?.deviceType || 'desktop',
          bandwidth: context?.bandwidth || 'medium',
          timeAvailable: context?.timeAvailable || 30
        },
        preferences: {
          includeVisuals: preferences?.includeVisuals || false,
          includeAssessments: false,
          includeTutoring: true,
          detailLevel: preferences?.detailLevel || 'moderate',
          responseStyle: preferences?.responseStyle || 'guided'
        }
      };

      const response = await this.aiEngine.generateIntegratedLearning(
        topic,
        'understand',
        request.userContext.userId,
        context,
        undefined
      );

      res.status(200).json({
        success: true,
        data: {
          tutoringResponse: response.content.tutoringResponse,
          metadata: response.metadata
        }
      });
    } catch (error) {
      console.error('Error generating tutoring response:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to generate tutoring response'
      });
    }
  }

  /**
   * Get learning models statistics
   */
  async getModelStats(_req: Request, res: Response): Promise<void> {
    try {
      const stats = this.aiEngine.getLearningModelsStats();
      
      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Error getting model stats:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get model statistics'
      });
    }
  }

  /**
   * Get learning models configuration
   */
  async getConfig(_req: Request, res: Response): Promise<void> {
    try {
      const config = this.aiEngine.getLearningModelsConfig();
      
      res.status(200).json({
        success: true,
        data: config
      });
    } catch (error) {
      console.error('Error getting config:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get configuration'
      });
    }
  }

  /**
   * Update learning models configuration
   */
  async updateConfig(req: Request, res: Response): Promise<void> {
    try {
      const config: Partial<LearningModelsConfig> = req.body;

      // Validate configuration
      if (config.enableVisualLearning !== undefined && typeof config.enableVisualLearning !== 'boolean') {
        res.status(400).json({
          success: false,
          error: 'enableVisualLearning must be a boolean'
        });
        return;
      }

      if (config.enableAssessmentGeneration !== undefined && typeof config.enableAssessmentGeneration !== 'boolean') {
        res.status(400).json({
          success: false,
          error: 'enableAssessmentGeneration must be a boolean'
        });
        return;
      }

      if (config.enableTutoring !== undefined && typeof config.enableTutoring !== 'boolean') {
        res.status(400).json({
          success: false,
          error: 'enableTutoring must be a boolean'
        });
        return;
      }

      this.aiEngine.updateLearningModelsConfig(config);
      
      res.status(200).json({
        success: true,
        message: 'Configuration updated successfully',
        data: this.aiEngine.getLearningModelsConfig()
      });
    } catch (error) {
      console.error('Error updating config:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update configuration'
      });
    }
  }

  /**
   * Get Phase 1 models status
   */
  async getPhase1Status(_req: Request, res: Response): Promise<void> {
    try {
      const stats = this.aiEngine.getLearningModelsStats();
      
      const phase1Status = {
        visualLearning: {
          enabled: stats.visualLearning.enabled,
          version: stats.visualLearning.version,
          status: 'operational'
        },
        assessmentGeneration: {
          enabled: stats.assessmentGeneration.enabled,
          version: stats.assessmentGeneration.version,
          status: 'operational'
        },
        tutoring: {
          enabled: stats.tutoring.enabled,
          version: stats.tutoring.version,
          status: 'operational'
        }
      };

      res.status(200).json({
        success: true,
        data: phase1Status
      });
    } catch (error) {
      console.error('Error getting Phase 1 status:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get Phase 1 status'
      });
    }
  }

  /**
   * Accessibility: Generate screen reader content
   */
  async generateScreenReaderContent(req: Request, res: Response): Promise<void> {
    try {
      const request = req.body;
      const response = await this.aiEngine.getLearningModelsService().generateScreenReaderContent(request);
      res.status(200).json({ success: true, data: response });
    } catch (error) {
      console.error('Error generating screen reader content:', error);
      res.status(500).json({ success: false, error: 'Failed to generate screen reader content' });
    }
  }

  /**
   * Accessibility: Generate captions
   */
  async generateCaptions(req: Request, res: Response): Promise<void> {
    try {
      const request = req.body;
      const response = await this.aiEngine.getLearningModelsService().generateCaptions(request);
      res.status(200).json({ success: true, data: response });
    } catch (error) {
      console.error('Error generating captions:', error);
      res.status(500).json({ success: false, error: 'Failed to generate captions' });
    }
  }

  /**
   * Accessibility: Optimize content for mobile
   */
  async optimizeMobileContent(req: Request, res: Response): Promise<void> {
    try {
      const request = req.body;
      const response = await this.aiEngine.getLearningModelsService().optimizeMobileContent(request);
      res.status(200).json({ success: true, data: response });
    } catch (error) {
      console.error('Error optimizing mobile content:', error);
      res.status(500).json({ success: false, error: 'Failed to optimize mobile content' });
    }
  }

  /**
   * Engagement: Generate gamification content
   */
  async generateGamification(req: Request, res: Response): Promise<void> {
    try {
      const request = req.body;
      const response = await this.aiEngine.getLearningModelsService().generateGamification(request);
      res.status(200).json({ success: true, data: response });
    } catch (error) {
      console.error('Error generating gamification:', error);
      res.status(500).json({ success: false, error: 'Failed to generate gamification content' });
    }
  }

  /**
   * Engagement: Generate motivational content
   */
  async generateMotivation(req: Request, res: Response): Promise<void> {
    try {
      const request = req.body;
      const response = await this.aiEngine.getLearningModelsService().generateMotivation(request);
      res.status(200).json({ success: true, data: response });
    } catch (error) {
      console.error('Error generating motivation:', error);
      res.status(500).json({ success: false, error: 'Failed to generate motivational content' });
    }
  }

  /**
   * Engagement: Localize content with cultural context
   */
  async localizeContent(req: Request, res: Response): Promise<void> {
    try {
      const request = req.body;
      const response = await this.aiEngine.getLearningModelsService().localizeContent(request);
      res.status(200).json({ success: true, data: response });
    } catch (error) {
      console.error('Error localizing content:', error);
      res.status(500).json({ success: false, error: 'Failed to localize content' });
    }
  }
} 