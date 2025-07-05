import { VisualLearningModel, VisualContentRequest, VisualContentResponse } from './visual-learning-model';
import { AssessmentGenerationModel, AssessmentRequest, AssessmentResponse } from './assessment-generation-model';
import { TutoringModel, TutoringRequest, TutoringResponse } from './tutoring-model';

export interface LearningModelsConfig {
  enableVisualLearning: boolean;
  enableAssessmentGeneration: boolean;
  enableTutoring: boolean;
  defaultLanguage: string;
  culturalContext: string;
}

export interface IntegratedLearningRequest {
  topic: string;
  learningObjective: 'understand' | 'practice' | 'assess' | 'review';
  userContext: {
    userId: string;
    currentLevel: 'beginner' | 'intermediate' | 'advanced';
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
    progress: number; // 0-100
    strengths: string[];
    weaknesses: string[];
  };
  context: {
    location: string;
    culturalContext: string;
    language: string;
    deviceType: 'mobile' | 'desktop' | 'tablet';
    bandwidth: 'slow' | 'medium' | 'fast';
    timeAvailable: number; // minutes
  };
  preferences: {
    includeVisuals: boolean;
    includeAssessments: boolean;
    includeTutoring: boolean;
    detailLevel: 'brief' | 'moderate' | 'comprehensive';
    responseStyle: 'socratic' | 'direct' | 'guided' | 'encouraging';
  };
}

export interface IntegratedLearningResponse {
  sessionId: string;
  topic: string;
  learningObjective: string;
  content: {
    visualContent?: VisualContentResponse;
    assessment?: AssessmentResponse;
    tutoringResponse?: TutoringResponse;
  };
  recommendations: {
    nextSteps: string[];
    suggestedTopics: string[];
    practiceExercises: string[];
  };
  metadata: {
    generationTime: number;
    modelsUsed: string[];
    confidence: number;
    culturalAdaptation: boolean;
  };
}

export class LearningModelsService {
  private visualLearningModel: VisualLearningModel;
  private assessmentGenerationModel: AssessmentGenerationModel;
  private tutoringModel: TutoringModel;
  private config: LearningModelsConfig;

  constructor(config: LearningModelsConfig) {
    this.config = config;
    this.visualLearningModel = new VisualLearningModel();
    this.assessmentGenerationModel = new AssessmentGenerationModel();
    this.tutoringModel = new TutoringModel();
  }

  /**
   * Generate integrated learning content based on request
   */
  async generateIntegratedLearning(request: IntegratedLearningRequest): Promise<IntegratedLearningResponse> {
    const startTime = Date.now();
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const modelsUsed: string[] = [];

    // Initialize content object
    const content: any = {};

    // Generate visual content if requested and enabled
    if (request.preferences.includeVisuals && this.config.enableVisualLearning) {
      try {
        const visualRequest: VisualContentRequest = {
          topic: request.topic,
          learningStyle: request.userContext.learningStyle,
          difficulty: request.userContext.currentLevel,
          context: {
            location: request.context.location,
            culturalContext: request.context.culturalContext,
            deviceType: request.context.deviceType,
            bandwidth: request.context.bandwidth
          },
          preferences: {
            colorScheme: 'default',
            complexity: request.preferences.detailLevel === 'comprehensive' ? 'complex' : 
                       request.preferences.detailLevel === 'moderate' ? 'moderate' : 'simple',
            animation: request.context.bandwidth !== 'slow'
          }
        };

        content.visualContent = await this.visualLearningModel.generateVisualContent(visualRequest);
        modelsUsed.push('visual_learning');
      } catch (error) {
        console.error('Error generating visual content:', error);
      }
    }

    // Generate assessment if requested and enabled
    if (request.preferences.includeAssessments && this.config.enableAssessmentGeneration) {
      try {
        const assessmentRequest: AssessmentRequest = {
          topic: request.topic,
          difficulty: request.userContext.currentLevel,
          userLevel: {
            currentLevel: request.userContext.currentLevel,
            progress: request.userContext.progress,
            strengths: request.userContext.strengths,
            weaknesses: request.userContext.weaknesses,
            learningStyle: request.userContext.learningStyle
          },
          context: {
            location: request.context.location,
            culturalContext: request.context.culturalContext,
            language: request.context.language,
            timeAvailable: request.context.timeAvailable
          },
          preferences: {
            questionTypes: ['multiple_choice', 'true_false', 'fill_blank'],
            questionCount: this.calculateQuestionCount(request.userContext.currentLevel, request.context.timeAvailable),
            immediateFeedback: true
          }
        };

        content.assessment = await this.assessmentGenerationModel.generateAssessment(assessmentRequest);
        modelsUsed.push('assessment_generation');
      } catch (error) {
        console.error('Error generating assessment:', error);
      }
    }

    // Generate tutoring response if requested and enabled
    if (request.preferences.includeTutoring && this.config.enableTutoring) {
      try {
        const tutoringRequest: TutoringRequest = {
          question: this.generateTutoringQuestion(request),
          topic: request.topic,
          userContext: {
            userId: request.userContext.userId,
            currentLevel: request.userContext.currentLevel,
            learningStyle: request.userContext.learningStyle,
            previousQuestions: [],
            progress: request.userContext.progress,
            strengths: request.userContext.strengths,
            weaknesses: request.userContext.weaknesses
          },
          context: {
            location: request.context.location,
            culturalContext: request.context.culturalContext,
            language: request.context.language,
            timeAvailable: request.context.timeAvailable,
            sessionType: this.determineSessionType(request.learningObjective)
          },
          preferences: {
            responseStyle: request.preferences.responseStyle,
            detailLevel: request.preferences.detailLevel,
            includeExamples: true,
            includeVisuals: request.preferences.includeVisuals
          }
        };

        content.tutoringResponse = await this.tutoringModel.generateTutoringResponse(tutoringRequest);
        modelsUsed.push('tutoring');
      } catch (error) {
        console.error('Error generating tutoring response:', error);
      }
    }

    // Generate recommendations
    const recommendations = this.generateRecommendations(request, content);

    const generationTime = Date.now() - startTime;

    return {
      sessionId,
      topic: request.topic,
      learningObjective: request.learningObjective,
      content,
      recommendations,
      metadata: {
        generationTime,
        modelsUsed,
        confidence: this.calculateOverallConfidence(request, content),
        culturalAdaptation: request.context.culturalContext !== 'General'
      }
    };
  }

  /**
   * Generate a tutoring question based on learning objective
   */
  private generateTutoringQuestion(request: IntegratedLearningRequest): string {
    const topic = request.topic;
    
    switch (request.learningObjective) {
      case 'understand':
        return `Can you explain the key concepts of ${topic}?`;
      case 'practice':
        return `How can I practice applying ${topic}?`;
      case 'assess':
        return `What should I know about ${topic} for assessment?`;
      case 'review':
        return `Can you help me review ${topic}?`;
      default:
        return `Tell me about ${topic}`;
    }
  }

  /**
   * Determine session type based on learning objective
   */
  private determineSessionType(learningObjective: string): 'quick_help' | 'deep_dive' | 'review' | 'practice' {
    switch (learningObjective) {
      case 'understand':
        return 'deep_dive';
      case 'practice':
        return 'practice';
      case 'assess':
        return 'quick_help';
      case 'review':
        return 'review';
      default:
        return 'deep_dive';
    }
  }

  /**
   * Calculate appropriate question count based on user level and time available
   */
  private calculateQuestionCount(userLevel: string, timeAvailable: number): number {
    const baseQuestions = userLevel === 'beginner' ? 5 : userLevel === 'intermediate' ? 8 : 10;
    const timeBasedQuestions = Math.floor(timeAvailable / 2); // 2 minutes per question
    return Math.min(baseQuestions, timeBasedQuestions, 15); // Max 15 questions
  }

  /**
   * Generate recommendations based on content and user context
   */
  private generateRecommendations(request: IntegratedLearningRequest, content: any): {
    nextSteps: string[];
    suggestedTopics: string[];
    practiceExercises: string[];
  } {
    const nextSteps: string[] = [];
    const suggestedTopics: string[] = [];
    const practiceExercises: string[] = [];

    // Generate next steps based on learning objective
    switch (request.learningObjective) {
      case 'understand':
        nextSteps.push('Review the visual content to reinforce concepts');
        nextSteps.push('Take the assessment to test your understanding');
        nextSteps.push('Ask follow-up questions for clarification');
        break;
      case 'practice':
        nextSteps.push('Complete practice exercises');
        nextSteps.push('Apply concepts to real-world scenarios');
        nextSteps.push('Review your progress and identify areas for improvement');
        break;
      case 'assess':
        nextSteps.push('Take the assessment to evaluate your knowledge');
        nextSteps.push('Review incorrect answers and explanations');
        nextSteps.push('Focus on weak areas identified in the assessment');
        break;
      case 'review':
        nextSteps.push('Review key concepts and definitions');
        nextSteps.push('Complete a quick assessment to check retention');
        nextSteps.push('Connect this topic to related concepts');
        break;
    }

    // Generate suggested topics based on current topic
    suggestedTopics.push(`${request.topic} applications`);
    suggestedTopics.push(`Advanced ${request.topic} concepts`);
    suggestedTopics.push(`Related topics to ${request.topic}`);

    // Generate practice exercises
    practiceExercises.push(`Practice problem 1: Basic ${request.topic}`);
    practiceExercises.push(`Practice problem 2: Intermediate ${request.topic}`);
    practiceExercises.push(`Practice problem 3: Advanced ${request.topic}`);

    return {
      nextSteps,
      suggestedTopics,
      practiceExercises
    };
  }

  /**
   * Calculate overall confidence based on all generated content
   */
  private calculateOverallConfidence(request: IntegratedLearningRequest, content: any): number {
    let totalConfidence = 0;
    let modelCount = 0;

    if (content.visualContent) {
      totalConfidence += content.visualContent.metadata.confidence;
      modelCount++;
    }

    if (content.assessment) {
      totalConfidence += content.assessment.metadata.confidence;
      modelCount++;
    }

    if (content.tutoringResponse) {
      totalConfidence += content.tutoringResponse.response.confidence;
      modelCount++;
    }

    return modelCount > 0 ? totalConfidence / modelCount : 0.8;
  }

  /**
   * Get model statistics
   */
  getModelStatistics(): {
    visualLearning: { enabled: boolean; version: string };
    assessmentGeneration: { enabled: boolean; version: string };
    tutoring: { enabled: boolean; version: string };
  } {
    return {
      visualLearning: {
        enabled: this.config.enableVisualLearning,
        version: '1.0.0'
      },
      assessmentGeneration: {
        enabled: this.config.enableAssessmentGeneration,
        version: '1.0.0'
      },
      tutoring: {
        enabled: this.config.enableTutoring,
        version: '1.0.0'
      }
    };
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<LearningModelsConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Get current configuration
   */
  getConfig(): LearningModelsConfig {
    return { ...this.config };
  }
}

// Export all types and classes
export * from './visual-learning-model';
export * from './assessment-generation-model';
export * from './tutoring-model'; 