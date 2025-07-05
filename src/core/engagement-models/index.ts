import { GamificationModel, GamificationRequest, GamificationResponse } from './gamification-model';
import { MotivationalModel, MotivationalRequest, MotivationalResponse } from './motivational-model';
import { CulturalContextModel, CulturalContextRequest, CulturalContextResponse } from './cultural-context-model';

export class EngagementModelsService {
  private gamificationModel: GamificationModel;
  private motivationalModel: MotivationalModel;
  private culturalContextModel: CulturalContextModel;

  constructor() {
    this.gamificationModel = new GamificationModel();
    this.motivationalModel = new MotivationalModel();
    this.culturalContextModel = new CulturalContextModel();
  }

  async generateGamification(request: GamificationRequest): Promise<GamificationResponse> {
    return this.gamificationModel.generateGamification(request);
  }

  async generateMotivation(request: MotivationalRequest): Promise<MotivationalResponse> {
    return this.motivationalModel.generateMotivation(request);
  }

  async localizeContent(request: CulturalContextRequest): Promise<CulturalContextResponse> {
    return this.culturalContextModel.localizeContent(request);
  }
}

export * from './gamification-model';
export * from './motivational-model';
export * from './cultural-context-model'; 