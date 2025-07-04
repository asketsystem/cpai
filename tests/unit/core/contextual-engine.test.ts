import { ContextualEngine } from '../../../src/core/contextual-engine';

describe('ContextualEngine', () => {
  let engine: ContextualEngine;

  beforeEach(() => {
    engine = new ContextualEngine();
  });

  describe('initialization', () => {
    it('should initialize with default context', () => {
      const context = engine.getContext();
      expect(context).toBeDefined();
      expect(context?.location.country).toBe('Nigeria');
      expect(context?.device.type).toBe('mobile');
    });
  });

  describe('context analysis', () => {
    it('should analyze context and provide recommendations', () => {
      const analysis = engine.analyzeContext();
      expect(analysis).toHaveProperty('recommendations');
      expect(analysis).toHaveProperty('adaptations');
      expect(analysis).toHaveProperty('constraints');
    });

    it('should detect offline mode when not online', () => {
      engine.updateContext({
        connectivity: {
          type: 'offline',
          speed: 'slow',
          isOnline: false,
        },
      });

      const analysis = engine.analyzeContext();
      expect(analysis.constraints).toContain('offline_mode_required');
    });
  });

  describe('localization', () => {
    it('should provide localized settings for Nigeria', () => {
      const settings = engine.getLocalizedSettings();
      expect(settings.currency).toBe('NGN');
      expect(settings.language).toBe('en');
    });
  });
}); 