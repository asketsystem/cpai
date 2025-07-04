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

export interface ContextualAnalysis {
  recommendations: string[];
  adaptations: Record<string, any>;
  constraints: string[];
}

export interface LocalizationSettings {
  language: string;
  currency: string;
  dateFormat: string;
  numberFormat: string;
} 