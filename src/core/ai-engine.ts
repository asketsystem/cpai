import { ContextualEngine, ContextualData } from './contextual-engine';
import { PersonalEngine, PersonalData } from './personal-engine';
import { LanguageModelService, LanguageModelResponse, CodeSwitchingResponse } from './language-model-service';
import { LearningModelsService, IntegratedLearningRequest, IntegratedLearningResponse, LearningModelsConfig, OfflineFirstRequest, OfflineFirstResponse, LowBandwidthRequest, LowBandwidthResponse, BehavioralAdaptationRequest, BehavioralAdaptationResponse } from './learning-models';

export interface AIResponse {
  content: string;
  format: 'text' | 'audio' | 'video' | 'interactive';
  adaptations: Record<string, any>;
  recommendations: string[];
  nextSteps: string[];
}

export interface LearningSession {
  id: string;
  userId: string;
  context: ContextualData;
  personal: PersonalData;
  content: string;
  progress: number;
  startTime: Date;
  endTime?: Date;
}

export class AIEngine {
  private contextualEngine: ContextualEngine;
  private personalEngine: PersonalEngine;
  private languageModelService: LanguageModelService;
  private learningModelsService: LearningModelsService;

  constructor() {
    this.contextualEngine = new ContextualEngine();
    this.personalEngine = new PersonalEngine();
    this.languageModelService = new LanguageModelService();
    
    // Initialize learning models service with default configuration
    const learningConfig: LearningModelsConfig = {
      enableVisualLearning: true,
      enableAssessmentGeneration: true,
      enableTutoring: true,
      defaultLanguage: 'en',
      culturalContext: 'West African'
    };
    this.learningModelsService = new LearningModelsService(learningConfig);
  }

  async generateResponse(
    userInput: string,
    _userId: string,
    context?: Partial<ContextualData>,
    personal?: Partial<PersonalData>
  ): Promise<AIResponse> {
    // Update engines with current context and personal data
    if (context) {
      this.contextualEngine.updateContext(context);
    }
    if (personal) {
      this.personalEngine.updatePersonalData(personal);
    }

    // Analyze current context and personal needs
    const contextualAnalysis = this.contextualEngine.analyzeContext();
    const personalAnalysis = this.personalEngine.analyzeLearningNeeds();

    // Determine optimal response format
    const optimalFormat = this.determineOptimalFormat(contextualAnalysis, personalAnalysis);

    // Generate contextualized and personalized response
    const response = await this.generateContextualizedResponse(
      userInput,
      contextualAnalysis,
      personalAnalysis
    );

    return {
      content: response,
      format: optimalFormat,
      adaptations: { ...contextualAnalysis.adaptations, ...personalAnalysis.adaptations },
      recommendations: [...contextualAnalysis.recommendations, ...personalAnalysis.recommendations],
      nextSteps: this.generateNextSteps(contextualAnalysis, personalAnalysis),
    };
  }

  private determineOptimalFormat(
    contextualAnalysis: any,
    personalAnalysis: any
  ): 'text' | 'audio' | 'video' | 'interactive' {
    // Priority: accessibility > context > personal preference
    if (personalAnalysis.adaptations.screenReader) {
      return 'audio';
    }
    if (personalAnalysis.adaptations.captions) {
      return 'text';
    }
    if (contextualAnalysis.adaptations.lowBandwidth) {
      return 'text';
    }
    if (contextualAnalysis.adaptations.mobileOptimized) {
      return 'interactive';
    }
    
    return personalAnalysis.adaptations.visualContent ? 'video' : 'text';
  }

  private async generateContextualizedResponse(
    userInput: string,
    contextualAnalysis: any,
    personalAnalysis: any
  ): Promise<string> {
    const context = this.contextualEngine.getContext();
    const personal = this.personalEngine.getPersonalData();
    
    if (!context || !personal) {
      return 'I understand you\'re asking about: ' + userInput;
    }

    // Get optimal language model for the user's context
    const optimalModel = this.languageModelService.getOptimalLanguageModel(
      personal.preferences.language,
      context.location.country,
      personal.profile.occupation
    );

    if (optimalModel) {
      try {
        // Generate response using the fine-tuned language model
        const languageResponse = await this.languageModelService.generateContent(
          userInput,
          optimalModel.code,
          {
            location: context.location.country,
            timeOfDay: context.environment.timeOfDay,
            offlineMode: contextualAnalysis.adaptations.offlineMode,
            lowBandwidth: contextualAnalysis.adaptations.lowBandwidth,
            mobileDevice: context.device.type === 'mobile'
          }
        );

        return languageResponse.content;
      } catch (error) {
        console.warn('Language model not available, falling back to default response');
      }
    }

    // Fallback to default contextualized response
    let response = `Based on your context in ${context.location.country} and your ${personal.learning.style} learning style, `;
    
    if (contextualAnalysis.adaptations.offlineMode) {
      response += 'I\'ll provide offline-accessible content. ';
    }
    
    if (personalAnalysis.adaptations.visualContent) {
      response += 'I\'ll include visual elements to help you learn better. ';
    }
    
    response += `Here\'s what I understand about your question: ${userInput}`;
    
    return response;
  }

  private generateNextSteps(
    contextualAnalysis: any,
    personalAnalysis: any
  ): string[] {
    const nextSteps: string[] = [];

    // Context-based next steps
    if (contextualAnalysis.adaptations.offlineMode) {
      nextSteps.push('Download offline content for continued learning');
    }
    
    if (contextualAnalysis.adaptations.lowBandwidth) {
      nextSteps.push('Optimize content for your connection speed');
    }

    // Personal-based next steps
    if (personalAnalysis.adaptations.shortSessions) {
      nextSteps.push('Schedule shorter, focused learning sessions');
    }
    
    if (personalAnalysis.adaptations.gamification) {
      nextSteps.push('Enable gamification features for better engagement');
    }

    return nextSteps;
  }

  async createLearningSession(
    userId: string,
    topic: string,
    context?: Partial<ContextualData>,
    personal?: Partial<PersonalData>
  ): Promise<LearningSession> {
    // Update engines
    if (context) {
      this.contextualEngine.updateContext(context);
    }
    if (personal) {
      this.personalEngine.updatePersonalData(personal);
    }

    const sessionId = this.generateSessionId();
    const currentContext = this.contextualEngine.getContext();
    const currentPersonal = this.personalEngine.getPersonalData();

    if (!currentContext || !currentPersonal) {
      throw new Error('Unable to create session: missing context or personal data');
    }

    const session: LearningSession = {
      id: sessionId,
      userId,
      context: currentContext,
      personal: currentPersonal,
      content: topic,
      progress: 0,
      startTime: new Date(),
    };

    return session;
  }

  async updateSessionProgress(
    sessionId: string,
    progress: number,
    _additionalData?: any
  ): Promise<void> {
    // Update session progress and adapt content accordingly
    // This would typically interact with a database
    console.log(`Updating session ${sessionId} progress to ${progress}%`);
  }

  async endSession(sessionId: string): Promise<void> {
    // End the learning session and generate insights
    console.log(`Ending session ${sessionId}`);
  }

  getContextualRecommendations(): string[] {
    const analysis = this.contextualEngine.analyzeContext();
    return analysis.recommendations;
  }

  getPersonalRecommendations(): string[] {
    const analysis = this.personalEngine.analyzeLearningNeeds();
    return analysis.recommendations;
  }

  getOptimalContentFormat(): {
    format: 'text' | 'audio' | 'video' | 'interactive';
    size: 'small' | 'medium' | 'large';
    complexity: 'simple' | 'moderate' | 'complex';
  } {
    return this.contextualEngine.getOptimalContentFormat();
  }

  getAdaptiveRecommendations(): {
    contentType: string;
    duration: number;
    difficulty: string;
    format: string;
  } {
    return this.personalEngine.getAdaptiveRecommendations();
  }

  /**
   * Generate content in a specific West African language
   */
  async generateLanguageContent(
    prompt: string,
    languageCode: string,
    context?: Partial<ContextualData>
  ): Promise<LanguageModelResponse> {
    if (context) {
      this.contextualEngine.updateContext(context);
    }

    const contextualAnalysis = this.contextualEngine.analyzeContext();
    
          return await this.languageModelService.generateContent(
        prompt,
        languageCode,
        {
          location: context?.location?.country || 'Unknown',
          timeOfDay: context?.environment?.timeOfDay || 'afternoon',
          offlineMode: contextualAnalysis.adaptations['offlineMode'],
          lowBandwidth: contextualAnalysis.adaptations['lowBandwidth'],
          mobileDevice: context?.device?.type === 'mobile'
        }
      );
  }

  /**
   * Handle code-switching between languages
   */
  async handleCodeSwitching(
    primaryLanguage: string,
    secondaryLanguage: string
  ): Promise<CodeSwitchingResponse> {
    return await this.languageModelService.handleCodeSwitching(
      primaryLanguage,
      secondaryLanguage
    );
  }

  /**
   * Get available language models for a location
   */
  getAvailableLanguages(location: string): any[] {
    return this.languageModelService.getModelsByLocation(location);
  }

  /**
   * Get language model statistics
   */
  getLanguageModelStats(): any {
    return this.languageModelService.getModelStatistics();
  }

  /**
   * Get high-priority languages for development
   */
  getHighPriorityLanguages(): any[] {
    return this.languageModelService.getHighPriorityModels();
  }

  /**
   * Generate integrated learning content using Phase 1 models
   */
  async generateIntegratedLearning(
    topic: string,
    learningObjective: 'understand' | 'practice' | 'assess' | 'review',
    userId: string,
    context?: Partial<ContextualData>,
    personal?: Partial<PersonalData>
  ): Promise<IntegratedLearningResponse> {
    // Update engines with current context and personal data
    if (context) {
      this.contextualEngine.updateContext(context);
    }
    if (personal) {
      this.personalEngine.updatePersonalData(personal);
    }

    const currentContext = this.contextualEngine.getContext();
    const currentPersonal = this.personalEngine.getPersonalData();

    if (!currentContext || !currentPersonal) {
      throw new Error('Unable to generate learning content: missing context or personal data');
    }

    // Create integrated learning request
    const request: IntegratedLearningRequest = {
      topic,
      learningObjective,
      userContext: {
        userId,
        currentLevel: currentPersonal.learning.difficulty || 'beginner',
        learningStyle: currentPersonal.learning.style || 'visual',
        progress: 0, // Will be tracked separately
        strengths: [], // Will be populated from learning analytics
        weaknesses: [] // Will be populated from learning analytics
      },
      context: {
        location: currentContext.location.country || 'Unknown',
        culturalContext: currentContext.environment.culturalContext || 'West African',
        language: currentPersonal.preferences.language || 'en',
        deviceType: currentContext.device.type || 'desktop',
        bandwidth: currentContext.connectivity.speed || 'medium',
        timeAvailable: 30 // Default 30 minutes
      },
      preferences: {
        includeVisuals: currentPersonal.learning.style === 'visual',
        includeAssessments: true,
        includeTutoring: true,
        detailLevel: 'moderate',
        responseStyle: 'guided'
      }
    };

    // Generate integrated learning content
    return await this.learningModelsService.generateIntegratedLearning(request);
  }

  /**
   * Get learning models statistics
   */
  getLearningModelsStats(): any {
    return this.learningModelsService.getModelStatistics();
  }

  /**
   * Update learning models configuration
   */
  updateLearningModelsConfig(config: Partial<LearningModelsConfig>): void {
    this.learningModelsService.updateConfig(config);
  }

  /**
   * Get current learning models configuration
   */
  getLearningModelsConfig(): LearningModelsConfig {
    return this.learningModelsService.getConfig();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getLearningModelsService(): LearningModelsService {
    return this.learningModelsService;
  }

  /**
   * Advanced Adaptation: Generate offline content
   */
  async generateOfflineContent(request: OfflineFirstRequest): Promise<OfflineFirstResponse> {
    try {
      console.log('Generating offline content', { request });
      
      const response = await this.learningModelsService.generateOfflineContent(request);
      
      console.log('Offline content generated successfully', { 
        storageSize: response.storageSize,
        syncRequired: response.syncRequired 
      });
      
      return response;
    } catch (error) {
      console.error('Error generating offline content', { error, request });
      throw error;
    }
  }

  /**
   * Advanced Adaptation: Compress content for low bandwidth
   */
  async compressContent(request: LowBandwidthRequest): Promise<LowBandwidthResponse> {
    try {
      console.log('Compressing content for low bandwidth', { request });
      
      const response = await this.learningModelsService.compressContent(request);
      
      console.log('Content compressed successfully', { 
        originalSize: response.originalSize,
        compressedSize: response.compressedSize,
        compressionRatio: response.compressionRatio 
      });
      
      return response;
    } catch (error) {
      console.error('Error compressing content', { error, request });
      throw error;
    }
  }

  /**
   * Advanced Adaptation: Adapt content based on user behavior
   */
  async adaptContent(request: BehavioralAdaptationRequest): Promise<BehavioralAdaptationResponse> {
    try {
      console.log('Adapting content based on user behavior', { request });
      
      const response = await this.learningModelsService.adaptContent(request);
      
      console.log('Content adapted successfully', { 
        userId: request.userId,
        adaptations: response.adaptations,
        confidence: response.metadata.confidence 
      });
      
      return response;
    } catch (error) {
      console.error('Error adapting content', { error, request });
      throw error;
    }
  }
} 