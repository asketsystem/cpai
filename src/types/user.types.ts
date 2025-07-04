export interface User {
  id: string;
  email: string;
  name: string;
  profile: UserProfile;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  age: number;
  education: string;
  occupation: string;
  location: {
    country: string;
    region: string;
    city: string;
  };
  interests: string[];
  goals: string[];
  challenges: string[];
}

export interface UserPreferences {
  language: string;
  contentFormat: 'text' | 'audio' | 'video' | 'mixed';
  interactionStyle: 'guided' | 'exploratory' | 'challenging';
  feedbackFrequency: 'immediate' | 'periodic' | 'on-demand';
  accessibility: {
    visualImpairment: boolean;
    hearingImpairment: boolean;
    motorImpairment: boolean;
    cognitiveImpairment: boolean;
    preferredAccessibility: string[];
  };
} 