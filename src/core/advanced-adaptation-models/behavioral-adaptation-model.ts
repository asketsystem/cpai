export interface BehavioralAdaptationRequest {
  userId: string;
  content: string;
  userBehavior: {
    attentionSpan: number; // minutes
    completionRate: number; // percentage
    interactionFrequency: number; // interactions per session
    preferredFormat: 'text' | 'audio' | 'video' | 'interactive';
    learningPace: 'slow' | 'medium' | 'fast';
  };
  context: {
    deviceType: 'mobile' | 'desktop' | 'tablet';
    sessionDuration: number; // minutes
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  };
}

export interface BehavioralAdaptationResponse {
  adaptedContent: string;
  adaptations: {
    pacing: 'accelerated' | 'normal' | 'slowed';
    format: 'text' | 'audio' | 'video' | 'interactive';
    complexity: 'simplified' | 'standard' | 'enhanced';
    engagement: 'high' | 'medium' | 'low';
  };
  recommendations: string[];
  metadata: {
    modelVersion: string;
    generationTime: number;
    confidence: number;
  };
}

export class BehavioralAdaptationModel {
  private modelVersion = '1.0.0';

  async adaptContent(request: BehavioralAdaptationRequest): Promise<BehavioralAdaptationResponse> {
    const startTime = Date.now();
    
    let adaptedContent = request.content;
    const adaptations = {
      pacing: this.determinePacing(request.userBehavior),
      format: this.determineFormat(request.userBehavior),
      complexity: this.determineComplexity(request.userBehavior),
      engagement: this.determineEngagement(request.userBehavior, request.context)
    };
    
    // Apply adaptations to content
    adaptedContent = this.applyAdaptations(adaptedContent, adaptations);
    
    const recommendations = this.generateRecommendations(request.userBehavior, adaptations);
    
    return {
      adaptedContent,
      adaptations,
      recommendations,
      metadata: {
        modelVersion: this.modelVersion,
        generationTime: Date.now() - startTime,
        confidence: 0.92
      }
    };
  }

  private determinePacing(behavior: any): 'accelerated' | 'normal' | 'slowed' {
    if (behavior.learningPace === 'fast' && behavior.completionRate > 80) return 'accelerated';
    if (behavior.learningPace === 'slow' || behavior.completionRate < 50) return 'slowed';
    return 'normal';
  }

  private determineFormat(behavior: any): 'text' | 'audio' | 'video' | 'interactive' {
    return behavior.preferredFormat;
  }

  private determineComplexity(behavior: any): 'simplified' | 'standard' | 'enhanced' {
    if (behavior.attentionSpan < 15 || behavior.completionRate < 60) return 'simplified';
    if (behavior.attentionSpan > 45 && behavior.completionRate > 90) return 'enhanced';
    return 'standard';
  }

  private determineEngagement(behavior: any, context: any): 'high' | 'medium' | 'low' {
    if (behavior.interactionFrequency > 10 && context.sessionDuration > 30) return 'high';
    if (behavior.interactionFrequency < 3 || context.sessionDuration < 10) return 'low';
    return 'medium';
  }

  private applyAdaptations(content: string, adaptations: any): string {
    let adaptedContent = content;
    
    // Apply pacing adaptations
    if (adaptations.pacing === 'accelerated') {
      adaptedContent = `[FAST-PACED] ${adaptedContent}`;
    } else if (adaptations.pacing === 'slowed') {
      adaptedContent = `[SLOW-PACED] ${adaptedContent}`;
    }
    
    // Apply format adaptations
    adaptedContent = `[${adaptations.format.toUpperCase()}-FORMAT] ${adaptedContent}`;
    
    // Apply complexity adaptations
    if (adaptations.complexity === 'simplified') {
      adaptedContent = `[SIMPLIFIED] ${adaptedContent}`;
    } else if (adaptations.complexity === 'enhanced') {
      adaptedContent = `[ENHANCED] ${adaptedContent}`;
    }
    
    return adaptedContent;
  }

  private generateRecommendations(behavior: any, adaptations: any): string[] {
    const recommendations: string[] = [];
    
    if (adaptations.engagement === 'low') {
      recommendations.push('Consider shorter, more interactive sessions');
    }
    
    if (behavior.attentionSpan < 20) {
      recommendations.push('Break content into smaller chunks');
    }
    
    if (behavior.completionRate < 70) {
      recommendations.push('Provide more guided learning paths');
    }
    
    return recommendations;
  }
} 