const request = require('supertest');
const { app } = require('../src/app');

describe('Advanced Adaptation Endpoints', () => {
  describe('POST /api/learning/offline-content', () => {
    it('should generate offline content with valid request', async () => {
      const res = await request(app)
        .post('/api/learning/offline-content')
        .send({
          content: 'Test content for offline',
          contentType: 'text',
          priority: 'high',
          context: { deviceType: 'mobile', storageAvailable: 100 }
        });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('offlineContent');
      expect(res.body.data).toHaveProperty('syncRequired');
    });
    it('should return 400 for missing required fields', async () => {
      const res = await request(app)
        .post('/api/learning/offline-content')
        .send({ content: 'Missing fields' });
      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/learning/compress-content', () => {
    it('should compress content for low bandwidth', async () => {
      const res = await request(app)
        .post('/api/learning/compress-content')
        .send({
          content: 'Test content for compression',
          contentType: 'text',
          bandwidth: 'slow',
          context: { deviceType: 'mobile', connectionType: 'wifi' }
        });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('compressedContent');
      expect(res.body.data).toHaveProperty('compressionRatio');
    });
    it('should return 400 for missing required fields', async () => {
      const res = await request(app)
        .post('/api/learning/compress-content')
        .send({ content: 'Missing fields' });
      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/learning/adapt-content', () => {
    it('should adapt content based on user behavior', async () => {
      const res = await request(app)
        .post('/api/learning/adapt-content')
        .send({
          userId: 'user123',
          content: 'Test content for adaptation',
          userBehavior: {
            attentionSpan: 20,
            completionRate: 60,
            interactionFrequency: 5,
            preferredFormat: 'text',
            learningPace: 'medium'
          },
          context: { deviceType: 'mobile', sessionDuration: 30, timeOfDay: 'morning' }
        });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('adaptedContent');
      expect(res.body.data).toHaveProperty('adaptations');
    });
    it('should return 400 for missing required fields', async () => {
      const res = await request(app)
        .post('/api/learning/adapt-content')
        .send({ content: 'Missing fields' });
      expect(res.status).toBe(400);
    });
  });
}); 