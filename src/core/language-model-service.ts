import { LanguageModelConfig, WEST_AFRICAN_LANGUAGE_MODELS, getLanguageModelByCode } from '../config/language-models';

export interface LanguageModelResponse {
  content: string;
  language: string;
  confidence: number;
  adaptations: Record<string, any>;
  culturalContext: string[];
}

export interface CodeSwitchingResponse {
  content: string;
  primaryLanguage: string;
  secondaryLanguage: string;
  switchingPatterns: string[];
  confidence: number;
}

export class LanguageModelService {
  private availableModels: Map<string, LanguageModelConfig> = new Map();
  private activeModels: Set<string> = new Set();

  constructor() {
    this.initializeModels();
  }

  private initializeModels(): void {
    WEST_AFRICAN_LANGUAGE_MODELS.forEach(model => {
      this.availableModels.set(model.code, model);
    });
  }

  /**
   * Get the optimal language model for a given context
   */
  getOptimalLanguageModel(
    userLanguage: string,
    location: string,
    context: string
  ): LanguageModelConfig | null {
    // First, try to match the user's preferred language
    const userModel = this.availableModels.get(userLanguage);
    if (userModel && this.isModelAvailable(userModel.code)) {
      return userModel;
    }

    // If not available, find the best alternative based on location and context
    const locationModels = this.getModelsByLocation(location);
    const contextModels = this.getModelsByContext(context);

    // Prioritize models that match both location and context
    const intersection = locationModels.filter(model => 
      contextModels.some(ctxModel => ctxModel.code === model.code)
    );

    if (intersection.length > 0) {
      // Return the model with highest priority and speaker count
      return intersection.sort((a, b) => {
        if (a.priority !== b.priority) {
          return this.getPriorityWeight(b.priority) - this.getPriorityWeight(a.priority);
        }
        return b.speakers - a.speakers;
      })[0] || null;
    }

    // Fallback to location-based models
    if (locationModels.length > 0) {
      return locationModels.sort((a, b) => b.speakers - a.speakers)[0] || null;
    }

    return null;
  }

  /**
   * Generate content in a specific West African language
   */
  async generateContent(
    prompt: string,
    languageCode: string,
    context: Record<string, any>
  ): Promise<LanguageModelResponse> {
    const model = this.availableModels.get(languageCode);
    
    if (!model) {
      throw new Error(`Language model not found for code: ${languageCode}`);
    }

    if (!this.isModelAvailable(languageCode)) {
      throw new Error(`Language model not available: ${languageCode}`);
    }

    // This would integrate with actual fine-tuned models
    // For now, return a structured response
    const response = await this.generateMockResponse(prompt, model, context);

    return {
      content: response.content,
      language: languageCode,
      confidence: response.confidence,
      adaptations: this.getLanguageAdaptations(model, context),
      culturalContext: this.getCulturalContext(model, context)
    };
  }

  /**
   * Handle code-switching between languages
   */
  async handleCodeSwitching(
    input: string,
    primaryLanguage: string,
    secondaryLanguage: string,
    context: Record<string, any>
  ): Promise<CodeSwitchingResponse> {
    const primaryModel = this.availableModels.get(primaryLanguage);
    const secondaryModel = this.availableModels.get(secondaryLanguage);

    if (!primaryModel || !secondaryModel) {
      throw new Error('One or both language models not found');
    }

    // Analyze code-switching patterns
    const switchingPatterns = this.analyzeCodeSwitchingPatterns(input, primaryLanguage, secondaryLanguage);
    
    // Generate response with appropriate code-switching
    const response = await this.generateCodeSwitchedResponse(
      input, 
      primaryModel, 
      secondaryModel, 
      switchingPatterns,
      context
    );

    return {
      content: response,
      primaryLanguage,
      secondaryLanguage,
      switchingPatterns,
      confidence: 0.85 // Mock confidence score
    };
  }

  /**
   * Get models available for a specific location
   */
  getModelsByLocation(location: string): LanguageModelConfig[] {
    return WEST_AFRICAN_LANGUAGE_MODELS.filter(model =>
      model.crossBorderValue.some(country => 
        country.toLowerCase().includes(location.toLowerCase())
      )
    );
  }

  /**
   * Get models specialized for a specific context
   */
  getModelsByContext(context: string): LanguageModelConfig[] {
    return WEST_AFRICAN_LANGUAGE_MODELS.filter(model =>
      model.specializations.some(specialization =>
        specialization.toLowerCase().includes(context.toLowerCase())
      )
    );
  }

  /**
   * Check if a language model is available and active
   */
  isModelAvailable(languageCode: string): boolean {
    const model = this.availableModels.get(languageCode);
    if (!model) return false;

    // Check if model is completed or in progress
    return model.fineTuningStatus === 'completed' || model.fineTuningStatus === 'in-progress';
  }

  /**
   * Get all available language models
   */
  getAvailableModels(): LanguageModelConfig[] {
    return WEST_AFRICAN_LANGUAGE_MODELS.filter(model => 
      this.isModelAvailable(model.code)
    );
  }

  /**
   * Get high-priority models that should be developed first
   */
  getHighPriorityModels(): LanguageModelConfig[] {
    return WEST_AFRICAN_LANGUAGE_MODELS.filter(model => 
      model.priority === 'high'
    );
  }

  /**
   * Get language-specific adaptations
   */
  private getLanguageAdaptations(model: LanguageModelConfig, context: Record<string, any>): Record<string, any> {
    const adaptations: Record<string, any> = {
      script: model.name === 'Tamazight' ? 'Tifinagh' : 'Latin',
      direction: 'ltr',
      culturalSensitivity: true
    };

    // Add context-specific adaptations
    if (context['offlineMode']) {
      adaptations['offlineOptimized'] = true;
    }

    if (context['lowBandwidth']) {
      adaptations['compressedContent'] = true;
    }

    if (context['mobileDevice']) {
      adaptations['mobileOptimized'] = true;
    }

    return adaptations;
  }

  /**
   * Get cultural context for a language
   */
  private getCulturalContext(model: LanguageModelConfig, context: Record<string, any>): string[] {
    const culturalContext = [...model.specializations];

    // Add location-specific cultural elements
    if (context['location']) {
      culturalContext.push(`local_${context['location']}`);
    }

    // Add time-based cultural elements
    if (context['timeOfDay']) {
      culturalContext.push(`time_${context['timeOfDay']}`);
    }

    return culturalContext;
  }

  /**
   * Analyze code-switching patterns in input
   */
  private analyzeCodeSwitchingPatterns(
    input: string, 
    primaryLanguage: string, 
    secondaryLanguage: string
  ): string[] {
    // This would use actual NLP to detect code-switching patterns
    // For now, return common patterns
    const patterns: string[] = [];
    
    if (primaryLanguage === 'en' && secondaryLanguage === 'yo') {
      patterns.push('greeting_switch', 'gratitude_switch', 'emphasis_switch');
    } else if (primaryLanguage === 'fr' && secondaryLanguage === 'wo') {
      patterns.push('greeting_switch', 'gratitude_switch', 'cultural_reference');
    }

    return patterns;
  }

  /**
   * Generate mock response for demonstration
   */
  private async generateMockResponse(
    prompt: string, 
    model: LanguageModelConfig, 
    context: Record<string, any>
  ): Promise<{ content: string; confidence: number }> {
    // This would call the actual fine-tuned model
    // For now, return a contextualized mock response
    
    const culturalElements = model.specializations.join(', ');
    const locationContext = model.crossBorderValue[0];
    
    const content = `[${model.nativeName}] ${prompt} - Contextualized for ${locationContext} with ${culturalElements} focus. This response would be generated by the fine-tuned ${model.name} model.`;
    
    return {
      content,
      confidence: 0.92 // Mock confidence score
    };
  }

  /**
   * Generate code-switched response
   */
  private async generateCodeSwitchedResponse(
    input: string,
    primaryModel: LanguageModelConfig,
    secondaryModel: LanguageModelConfig,
    patterns: string[],
    context: Record<string, any>
  ): Promise<string> {
    // This would use actual code-switching models
    // For now, return a mock response with code-switching
    
    const primaryGreeting = this.getGreeting(primaryModel.code);
    const secondaryGreeting = this.getGreeting(secondaryModel.code);
    
    return `${primaryGreeting} ${input} ${secondaryGreeting} - This demonstrates natural code-switching between ${primaryModel.name} and ${secondaryModel.name}.`;
  }

  /**
   * Get greeting in specific language
   */
  private getGreeting(languageCode: string): string {
    const greetings: Record<string, string> = {
      'yo': 'Bawo ni?',
      'ig': 'Kedu ka ị mere?',
      'ha': 'Yaya kake?',
      'ff': 'Jam na?',
      'wo': 'Salamalekum',
      'bm': 'I ni sogoma',
      'ee': 'Woézo',
      'tw': 'Akwaba',
      'ga': 'Miihe',
      'dag': 'Dasiba',
      'mos': 'Ne y yaaogo',
      'son': 'Fofo',
      'zgh': 'Azul',
      'kab': 'Azul',
      'fon': 'Kúdó',
      'ba': 'Akwaba',
      'dyu': 'I ni sogoma',
      'bet': 'Glo',
      'sen': 'Yɛɛ'
    };

    return greetings[languageCode] || 'Hello';
  }

  /**
   * Get priority weight for sorting
   */
  private getPriorityWeight(priority: string): number {
    const weights = { high: 3, medium: 2, low: 1 };
    return weights[priority as keyof typeof weights] || 1;
  }

  /**
   * Get model statistics
   */
  getModelStatistics() {
    const total = WEST_AFRICAN_LANGUAGE_MODELS.length;
    const available = this.getAvailableModels().length;
    const highPriority = this.getHighPriorityModels().length;
    const totalSpeakers = WEST_AFRICAN_LANGUAGE_MODELS.reduce((sum, model) => sum + model.speakers, 0);

    return {
      total,
      available,
      highPriority,
      totalSpeakers,
      coverage: `${((available / total) * 100).toFixed(1)}%`
    };
  }
} 