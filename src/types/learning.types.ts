export interface LearningContent {
  id: string;
  title: string;
  description: string;
  type: 'lesson' | 'quiz' | 'exercise' | 'assessment';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  format: 'text' | 'audio' | 'video' | 'interactive';
  duration: number; // minutes
  tags: string[];
  content: any;
  metadata: {
    language: string;
    region: string;
    curriculum: string;
    offlineAvailable: boolean;
  };
}

export interface LearningSession {
  id: string;
  userId: string;
  contentId: string;
  progress: number;
  startTime: Date;
  endTime?: Date;
  interactions: SessionInteraction[];
  context: SessionContext;
}

export interface SessionInteraction {
  id: string;
  type: 'question' | 'answer' | 'feedback' | 'navigation';
  timestamp: Date;
  data: any;
}

export interface SessionContext {
  device: string;
  location: string;
  connectivity: string;
  timeOfDay: string;
}

export interface LearningProgress {
  userId: string;
  contentId: string;
  completed: boolean;
  score?: number;
  timeSpent: number;
  attempts: number;
  lastAccessed: Date;
}

export interface AIResponse {
  content: string;
  format: 'text' | 'audio' | 'video' | 'interactive';
  adaptations: Record<string, any>;
  recommendations: string[];
  nextSteps: string[];
} 