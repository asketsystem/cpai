import { OfflineFirstModel, OfflineFirstRequest, OfflineFirstResponse } from './offline-first-model';
import { LowBandwidthModel, LowBandwidthRequest, LowBandwidthResponse } from './low-bandwidth-model';
import { BehavioralAdaptationModel, BehavioralAdaptationRequest, BehavioralAdaptationResponse } from './behavioral-adaptation-model';

export class AdvancedAdaptationModelsService {
  private offlineFirstModel: OfflineFirstModel;
  private lowBandwidthModel: LowBandwidthModel;
  private behavioralAdaptationModel: BehavioralAdaptationModel;

  constructor() {
    this.offlineFirstModel = new OfflineFirstModel();
    this.lowBandwidthModel = new LowBandwidthModel();
    this.behavioralAdaptationModel = new BehavioralAdaptationModel();
  }

  async generateOfflineContent(request: OfflineFirstRequest): Promise<OfflineFirstResponse> {
    return this.offlineFirstModel.generateOfflineContent(request);
  }

  async compressContent(request: LowBandwidthRequest): Promise<LowBandwidthResponse> {
    return this.lowBandwidthModel.compressContent(request);
  }

  async adaptContent(request: BehavioralAdaptationRequest): Promise<BehavioralAdaptationResponse> {
    return this.behavioralAdaptationModel.adaptContent(request);
  }
}

export * from './offline-first-model';
export * from './low-bandwidth-model';
export * from './behavioral-adaptation-model'; 