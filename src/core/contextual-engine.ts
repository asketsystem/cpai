export interface ContextualData {
  location: {
    country: string;
    region: string;
    city: string;
    timezone: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  device: {
    type: 'mobile' | 'desktop' | 'tablet';
    platform: string;
    browser: string;
    screenSize: {
      width: number;
      height: number;
    };
  };
  connectivity: {
    type: 'wifi' | 'mobile' | 'offline';
    speed: 'slow' | 'medium' | 'fast';
    isOnline: boolean;
  };
  environment: {
    language: string;
    currency: string;
    culturalContext: string;
    season: string;
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  };
  task: {
    currentActivity: string;
    goal: string;
    urgency: 'low' | 'medium' | 'high';
  };
}

export class ContextualEngine {
  private contextData: ContextualData | null = null;

  constructor() {
    this.initializeContext();
  }

  private initializeContext(): void {
    // Initialize with default context
    this.contextData = {
      location: {
        country: 'Nigeria',
        region: 'West Africa',
        city: 'Lagos',
        timezone: 'Africa/Lagos',
      },
      device: {
        type: 'mobile',
        platform: 'unknown',
        browser: 'unknown',
        screenSize: {
          width: 375,
          height: 667,
        },
      },
      connectivity: {
        type: 'mobile',
        speed: 'medium',
        isOnline: true,
      },
      environment: {
        language: 'en',
        currency: 'NGN',
        culturalContext: 'West African',
        season: 'dry',
        timeOfDay: 'afternoon',
      },
      task: {
        currentActivity: 'learning',
        goal: 'skill_development',
        urgency: 'medium',
      },
    };
  }

  updateContext(newContext: Partial<ContextualData>): void {
    if (this.contextData) {
      this.contextData = { ...this.contextData, ...newContext };
    }
  }

  getContext(): ContextualData | null {
    return this.contextData;
  }

  analyzeContext(): {
    recommendations: string[];
    adaptations: Record<string, any>;
    constraints: string[];
  } {
    if (!this.contextData) {
      return {
        recommendations: [],
        adaptations: {},
        constraints: [],
      };
    }

    const { location, device, connectivity, environment } = this.contextData;
    const recommendations: string[] = [];
    const adaptations: Record<string, any> = {};
    const constraints: string[] = [];

    // Analyze connectivity
    if (!connectivity.isOnline) {
      constraints.push('offline_mode_required');
      adaptations['offlineMode'] = true;
      recommendations.push('Use offline content and sync when connection is restored');
    }

    if (connectivity.speed === 'slow') {
      constraints.push('slow_connection');
      adaptations['lowBandwidth'] = true;
      recommendations.push('Optimize content for low bandwidth');
    }

    // Analyze device
    if (device.type === 'mobile') {
      adaptations['mobileOptimized'] = true;
      recommendations.push('Optimize interface for mobile interaction');
    }

    // Analyze location and cultural context
    if (location.country === 'Nigeria') {
      adaptations['localizedContent'] = true;
      adaptations['currency'] = 'NGN';
      recommendations.push('Provide content relevant to Nigerian context');
    }

    // Analyze time and season
    if (environment.timeOfDay === 'night') {
      adaptations['nightMode'] = true;
      recommendations.push('Enable night mode for better visibility');
    }

    return {
      recommendations,
      adaptations,
      constraints,
    };
  }

  getOptimalContentFormat(): {
    format: 'text' | 'audio' | 'video' | 'interactive';
    size: 'small' | 'medium' | 'large';
    complexity: 'simple' | 'moderate' | 'complex';
  } {
    const context = this.analyzeContext();
    
    let format: 'text' | 'audio' | 'video' | 'interactive' = 'text';
    let size: 'small' | 'medium' | 'large' = 'medium';
    let complexity: 'simple' | 'moderate' | 'complex' = 'moderate';

    // Determine format based on context
    if (context.adaptations['lowBandwidth']) {
      format = 'text';
      size = 'small';
      complexity = 'simple';
    } else if (context.adaptations['mobileOptimized']) {
      format = 'interactive';
      size = 'medium';
      complexity = 'moderate';
    }

    return { format, size, complexity };
  }

  shouldUseOfflineMode(): boolean {
    const context = this.analyzeContext();
    return context.constraints.includes('offline_mode_required');
  }

  getLocalizedSettings(): {
    language: string;
    currency: string;
    dateFormat: string;
    numberFormat: string;
  } {
    if (!this.contextData) {
      return {
        language: 'en',
        currency: 'USD',
        dateFormat: 'MM/DD/YYYY',
        numberFormat: '1,234.56',
      };
    }

    const { location, environment } = this.contextData;

    // Map countries to localized settings
    const localizationMap: Record<string, any> = {
      Nigeria: {
        language: 'en',
        currency: 'NGN',
        dateFormat: 'DD/MM/YYYY',
        numberFormat: '1,234.56',
      },
      Ghana: {
        language: 'en',
        currency: 'GHS',
        dateFormat: 'DD/MM/YYYY',
        numberFormat: '1,234.56',
      },
      Kenya: {
        language: 'en',
        currency: 'KES',
        dateFormat: 'DD/MM/YYYY',
        numberFormat: '1,234.56',
      },
    };

    return localizationMap[location.country] || {
      language: environment.language,
      currency: environment.currency,
      dateFormat: 'DD/MM/YYYY',
      numberFormat: '1,234.56',
    };
  }
} 