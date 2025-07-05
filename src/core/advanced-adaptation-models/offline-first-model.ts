export interface OfflineFirstRequest {
  content: string;
  contentType: 'text' | 'image' | 'video' | 'interactive';
  priority: 'high' | 'medium' | 'low';
  context: {
    deviceType: 'mobile' | 'desktop' | 'tablet';
    storageAvailable: number; // MB
    lastSyncTime?: Date;
  };
}

export interface OfflineFirstResponse {
  offlineContent: string;
  syncRequired: boolean;
  storageSize: number; // MB
  priority: 'high' | 'medium' | 'low';
  metadata: {
    modelVersion: string;
    generationTime: number;
    confidence: number;
  };
}

export class OfflineFirstModel {
  private modelVersion = '1.0.0';

  async generateOfflineContent(request: OfflineFirstRequest): Promise<OfflineFirstResponse> {
    const startTime = Date.now();
    
    // Simulate offline content generation
    let offlineContent = request.content;
    let syncRequired = false;
    let storageSize = this.calculateStorageSize(request.content, request.contentType);
    
    // Add offline indicators and sync markers
    if (request.priority === 'high') {
      offlineContent = `[OFFLINE-PRIORITY] ${offlineContent}`;
      syncRequired = true;
    }
    
    // Check if sync is needed based on last sync time
    if (request.context.lastSyncTime) {
      const hoursSinceSync = (Date.now() - request.context.lastSyncTime.getTime()) / (1000 * 60 * 60);
      if (hoursSinceSync > 24) {
        syncRequired = true;
      }
    }
    
    return {
      offlineContent,
      syncRequired,
      storageSize,
      priority: request.priority,
      metadata: {
        modelVersion: this.modelVersion,
        generationTime: Date.now() - startTime,
        confidence: 0.96
      }
    };
  }

  private calculateStorageSize(content: string, contentType: string): number {
    // Rough estimation of storage size
    const baseSize = content.length * 0.001; // 1KB per 1000 characters
    switch (contentType) {
      case 'image':
        return baseSize * 10; // Images are larger
      case 'video':
        return baseSize * 100; // Videos are much larger
      case 'interactive':
        return baseSize * 5; // Interactive content is larger
      default:
        return baseSize;
    }
  }
} 