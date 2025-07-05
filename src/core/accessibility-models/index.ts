import { ScreenReaderModel, ScreenReaderRequest, ScreenReaderResponse } from './screen-reader-model';
import { CaptionGenerationModel, CaptionGenerationRequest, CaptionGenerationResponse } from './caption-generation-model';
import { MobileOptimizedModel, MobileOptimizedRequest, MobileOptimizedResponse } from './mobile-optimized-model';

export class AccessibilityModelsService {
  private screenReaderModel: ScreenReaderModel;
  private captionGenerationModel: CaptionGenerationModel;
  private mobileOptimizedModel: MobileOptimizedModel;

  constructor() {
    this.screenReaderModel = new ScreenReaderModel();
    this.captionGenerationModel = new CaptionGenerationModel();
    this.mobileOptimizedModel = new MobileOptimizedModel();
  }

  async generateScreenReaderContent(request: ScreenReaderRequest): Promise<ScreenReaderResponse> {
    return this.screenReaderModel.generateScreenReaderContent(request);
  }

  async generateCaptions(request: CaptionGenerationRequest): Promise<CaptionGenerationResponse> {
    return this.captionGenerationModel.generateCaptions(request);
  }

  async optimizeContent(request: MobileOptimizedRequest): Promise<MobileOptimizedResponse> {
    return this.mobileOptimizedModel.optimizeContent(request);
  }
}

export * from './screen-reader-model';
export * from './caption-generation-model';
export * from './mobile-optimized-model'; 