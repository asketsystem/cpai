import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types for API requests and responses
export interface OfflineContentRequest {
  content: string;
  contentType: 'text' | 'image' | 'video' | 'interactive';
  priority: 'high' | 'medium' | 'low';
  context: {
    deviceType: 'mobile' | 'desktop' | 'tablet';
    storageAvailable: number;
    lastSyncTime?: string;
  };
}

export interface OfflineContentResponse {
  offlineContent: string;
  syncRequired: boolean;
  storageSize: number;
  priority: 'high' | 'medium' | 'low';
  metadata: {
    modelVersion: string;
    generationTime: number;
    confidence: number;
  };
}

export interface CompressContentRequest {
  content: string;
  contentType: 'text' | 'image' | 'video' | 'interactive';
  bandwidth: 'slow' | 'medium' | 'fast';
  context: {
    deviceType: 'mobile' | 'desktop' | 'tablet';
    connectionType: 'wifi' | 'mobile' | 'satellite';
  };
}

export interface CompressContentResponse {
  compressedContent: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  quality: 'high' | 'medium' | 'low';
  metadata: {
    modelVersion: string;
    generationTime: number;
    confidence: number;
  };
}

export interface AdaptContentRequest {
  userId: string;
  content: string;
  userBehavior: {
    attentionSpan: number;
    completionRate: number;
    interactionFrequency: number;
    preferredFormat: 'text' | 'audio' | 'video' | 'interactive';
    learningPace: 'slow' | 'medium' | 'fast';
  };
  context: {
    deviceType: 'mobile' | 'desktop' | 'tablet';
    sessionDuration: number;
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  };
}

export interface AdaptContentResponse {
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

// API methods
export const api = {
  // Generate offline content
  generateOfflineContent: async (request: OfflineContentRequest): Promise<OfflineContentResponse> => {
    const response = await apiClient.post('/learning/offline-content', request);
    return response.data.data;
  },

  // Compress content for low bandwidth
  compressContent: async (request: CompressContentRequest): Promise<CompressContentResponse> => {
    const response = await apiClient.post('/learning/compress-content', request);
    return response.data.data;
  },

  // Adapt content based on user behavior
  adaptContent: async (request: AdaptContentRequest): Promise<AdaptContentResponse> => {
    const response = await apiClient.post('/learning/adapt-content', request);
    return response.data.data;
  },
};

export default apiClient; 