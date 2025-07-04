export interface PersonalData {
  learning: {
    style: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
    pace: 'slow' | 'medium' | 'fast';
    preferredTime: 'morning' | 'afternoon' | 'evening' | 'night';
    attentionSpan: number; // minutes
    difficulty: 'beginner' | 'intermediate' | 'advanced';
  };
  preferences: {
    language: string;
    contentFormat: 'text' | 'audio' | 'video' | 'mixed';
    interactionStyle: 'guided' | 'exploratory' | 'challenging';
    feedbackFrequency: 'immediate' | 'periodic' | 'on-demand';
  };
  profile: {
    age: number;
    education: string;
    occupation: string;
    interests: string[];
    goals: string[];
    challenges: string[];
  };
  behavior: {
    sessionDuration: number; // average minutes
    frequency: 'daily' | 'weekly' | 'monthly';
    completionRate: number; // percentage
    engagementLevel: 'low' | 'medium' | 'high';
  };
  accessibility: {
    visualImpairment: boolean;
    hearingImpairment: boolean;
    motorImpairment: boolean;
    cognitiveImpairment: boolean;
    preferredAccessibility: string[];
  };
}

export class PersonalEngine {
  private personalData: PersonalData | null = null;

  constructor() {
    this.initializePersonalData();
  }

  private initializePersonalData(): void {
    // Initialize with default personal data
    this.personalData = {
      learning: {
        style: 'visual',
        pace: 'medium',
        preferredTime: 'afternoon',
        attentionSpan: 30,
        difficulty: 'intermediate',
      },
      preferences: {
        language: 'en',
        contentFormat: 'mixed',
        interactionStyle: 'guided',
        feedbackFrequency: 'periodic',
      },
      profile: {
        age: 25,
        education: 'university',
        occupation: 'student',
        interests: ['technology', 'education'],
        goals: ['skill_development', 'career_advancement'],
        challenges: ['time_management', 'access_to_resources'],
      },
      behavior: {
        sessionDuration: 45,
        frequency: 'daily',
        completionRate: 75,
        engagementLevel: 'medium',
      },
      accessibility: {
        visualImpairment: false,
        hearingImpairment: false,
        motorImpairment: false,
        cognitiveImpairment: false,
        preferredAccessibility: [],
      },
    };
  }

  updatePersonalData(newData: Partial<PersonalData>): void {
    if (this.personalData) {
      this.personalData = { ...this.personalData, ...newData };
    }
  }

  getPersonalData(): PersonalData | null {
    return this.personalData;
  }

  analyzeLearningNeeds(): {
    recommendations: string[];
    adaptations: Record<string, any>;
    contentSuggestions: string[];
  } {
    if (!this.personalData) {
      return {
        recommendations: [],
        adaptations: {},
        contentSuggestions: [],
      };
    }

    const { learning, behavior, accessibility } = this.personalData;
    const recommendations: string[] = [];
    const adaptations: Record<string, any> = {};
    const contentSuggestions: string[] = [];

    // Analyze learning style
    if (learning.style === 'visual') {
      adaptations['visualContent'] = true;
      contentSuggestions.push('diagrams', 'infographics', 'videos');
    } else if (learning.style === 'auditory') {
      adaptations['audioContent'] = true;
      contentSuggestions.push('podcasts', 'audio_lessons', 'discussions');
    }

    // Analyze pace
    if (learning.pace === 'slow') {
      adaptations['selfPaced'] = true;
      adaptations['breakdownContent'] = true;
      recommendations.push('Provide more time for content absorption');
    } else if (learning.pace === 'fast') {
      adaptations['acceleratedContent'] = true;
      contentSuggestions.push('advanced_topics', 'challenge_problems');
    }

    // Analyze attention span
    if (learning.attentionSpan < 30) {
      adaptations['shortSessions'] = true;
      adaptations['microLearning'] = true;
      recommendations.push('Break content into smaller, digestible chunks');
    }

    // Analyze accessibility needs
    if (accessibility.visualImpairment) {
      adaptations['screenReader'] = true;
      adaptations['audioDescriptions'] = true;
      recommendations.push('Provide audio alternatives for visual content');
    }

    if (accessibility.hearingImpairment) {
      adaptations['captions'] = true;
      adaptations['textAlternatives'] = true;
      recommendations.push('Provide captions and text alternatives');
    }

    // Analyze engagement level
    if (behavior.engagementLevel === 'low') {
      adaptations['gamification'] = true;
      adaptations['rewards'] = true;
      recommendations.push('Implement gamification elements to increase engagement');
    }

    return {
      recommendations,
      adaptations,
      contentSuggestions,
    };
  }

  getOptimalSessionDuration(): number {
    if (!this.personalData) return 30;

    const { learning, behavior } = this.personalData;
    
    // Consider both attention span and typical session duration
    const optimalDuration = Math.min(
      learning.attentionSpan,
      behavior.sessionDuration
    );

    return Math.max(15, Math.min(120, optimalDuration)); // Between 15 and 120 minutes
  }

  getContentDifficulty(): 'beginner' | 'intermediate' | 'advanced' {
    if (!this.personalData) return 'intermediate';

    const { learning, behavior } = this.personalData;
    
    // Adjust difficulty based on completion rate and engagement
    if (behavior.completionRate > 80 && behavior.engagementLevel === 'high') {
      return 'advanced';
    } else if (behavior.completionRate < 60 || behavior.engagementLevel === 'low') {
      return 'beginner';
    }
    
    return learning.difficulty;
  }

  shouldProvideImmediateFeedback(): boolean {
    if (!this.personalData) return false;

    const { preferences, behavior } = this.personalData;
    
    return (
      preferences.feedbackFrequency === 'immediate' ||
      behavior.engagementLevel === 'low' ||
      this.personalData.learning.difficulty === 'beginner'
    );
  }

  getPreferredContentFormat(): 'text' | 'audio' | 'video' | 'mixed' {
    if (!this.personalData) return 'mixed';

    const { preferences, accessibility } = this.personalData;
    
    // Override based on accessibility needs
    if (accessibility.visualImpairment) {
      return 'audio';
    }
    
    if (accessibility.hearingImpairment) {
      return 'text';
    }
    
    return preferences.contentFormat;
  }

  getMotivationalFactors(): string[] {
    if (!this.personalData) return ['achievement', 'recognition'];

    const { profile, behavior } = this.personalData;
    const factors: string[] = [];

    // Add factors based on profile and behavior
    if (profile.goals.includes('career_advancement')) {
      factors.push('career_growth', 'skill_development');
    }

    if (behavior.engagementLevel === 'low') {
      factors.push('gamification', 'rewards', 'social_recognition');
    }

    if (profile.interests.includes('technology')) {
      factors.push('innovation', 'cutting_edge_knowledge');
    }

    return factors.length > 0 ? factors : ['achievement', 'recognition'];
  }

  getAdaptiveRecommendations(): {
    contentType: string;
    duration: number;
    difficulty: string;
    format: string;
  } {
    const learningNeeds = this.analyzeLearningNeeds();
    const sessionDuration = this.getOptimalSessionDuration();
    const difficulty = this.getContentDifficulty();
    const format = this.getPreferredContentFormat();

    return {
      contentType: learningNeeds.contentSuggestions[0] || 'general',
      duration: sessionDuration,
      difficulty,
      format,
    };
  }
} 