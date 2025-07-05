export interface LanguageModelConfig {
  code: string;
  name: string;
  nativeName: string;
  priority: 'high' | 'medium' | 'low';
  speakers: number; // millions
  dataAvailability: 'high' | 'medium' | 'low';
  fineTuningStatus: 'planned' | 'in-progress' | 'completed';
  modelSize: 'small' | 'medium' | 'large';
  trainingData: {
    conversational: number; // hours
    educational: number; // documents
    cultural: number; // documents
    codeSwitching: number; // examples
  };
  specializations: string[];
  crossBorderValue: string[];
}

export const WEST_AFRICAN_LANGUAGE_MODELS: LanguageModelConfig[] = [
  // High Priority Languages
  {
    code: 'ha',
    name: 'Hausa',
    nativeName: 'Hausa',
    priority: 'high',
    speakers: 85,
    dataAvailability: 'high',
    fineTuningStatus: 'planned',
    modelSize: 'large',
    trainingData: {
      conversational: 1000,
      educational: 5000,
      cultural: 2000,
      codeSwitching: 10000
    },
    specializations: ['business', 'education', 'media', 'religion'],
    crossBorderValue: ['Nigeria', 'Niger', 'Ghana', 'Cameroon', 'Chad']
  },
  {
    code: 'yo',
    name: 'Yoruba',
    nativeName: 'Yorùbá',
    priority: 'high',
    speakers: 45,
    dataAvailability: 'high',
    fineTuningStatus: 'planned',
    modelSize: 'large',
    trainingData: {
      conversational: 800,
      educational: 4000,
      cultural: 3000,
      codeSwitching: 8000
    },
    specializations: ['culture', 'education', 'business', 'literature'],
    crossBorderValue: ['Nigeria', 'Benin', 'Togo']
  },
  {
    code: 'ff',
    name: 'Fula',
    nativeName: 'Fulfulde',
    priority: 'high',
    speakers: 40,
    dataAvailability: 'medium',
    fineTuningStatus: 'planned',
    modelSize: 'medium',
    trainingData: {
      conversational: 600,
      educational: 3000,
      cultural: 1500,
      codeSwitching: 6000
    },
    specializations: ['pastoralism', 'trade', 'education', 'poetry'],
    crossBorderValue: ['Senegal', 'Mali', 'Guinea', 'Burkina Faso', 'Niger', 'Nigeria', 'Cameroon']
  },
  {
    code: 'wo',
    name: 'Wolof',
    nativeName: 'Wolof',
    priority: 'high',
    speakers: 12,
    dataAvailability: 'high',
    fineTuningStatus: 'planned',
    modelSize: 'medium',
    trainingData: {
      conversational: 500,
      educational: 2500,
      cultural: 2000,
      codeSwitching: 5000
    },
    specializations: ['urban culture', 'media', 'education', 'business'],
    crossBorderValue: ['Senegal', 'Gambia', 'Mauritania']
  },
  {
    code: 'bm',
    name: 'Bambara',
    nativeName: 'Bamanankan',
    priority: 'high',
    speakers: 15,
    dataAvailability: 'medium',
    fineTuningStatus: 'planned',
    modelSize: 'medium',
    trainingData: {
      conversational: 400,
      educational: 2000,
      cultural: 1000,
      codeSwitching: 4000
    },
    specializations: ['agriculture', 'education', 'trade', 'oral tradition'],
    crossBorderValue: ['Mali', 'Burkina Faso', 'Côte d\'Ivoire']
  },
  {
    code: 'ig',
    name: 'Igbo',
    nativeName: 'Igbo',
    priority: 'high',
    speakers: 35,
    dataAvailability: 'medium',
    fineTuningStatus: 'planned',
    modelSize: 'medium',
    trainingData: {
      conversational: 600,
      educational: 3000,
      cultural: 1500,
      codeSwitching: 6000
    },
    specializations: ['business', 'education', 'technology', 'entrepreneurship'],
    crossBorderValue: ['Nigeria']
  },
  {
    code: 'tw',
    name: 'Twi',
    nativeName: 'Twi',
    priority: 'medium',
    speakers: 18,
    dataAvailability: 'medium',
    fineTuningStatus: 'planned',
    modelSize: 'medium',
    trainingData: {
      conversational: 400,
      educational: 2000,
      cultural: 1000,
      codeSwitching: 4000
    },
    specializations: ['education', 'culture', 'business', 'media'],
    crossBorderValue: ['Ghana', 'Côte d\'Ivoire']
  },
  {
    code: 'ee',
    name: 'Ewe',
    nativeName: 'Eʋegbe',
    priority: 'medium',
    speakers: 8,
    dataAvailability: 'medium',
    fineTuningStatus: 'planned',
    modelSize: 'small',
    trainingData: {
      conversational: 300,
      educational: 1500,
      cultural: 800,
      codeSwitching: 3000
    },
    specializations: ['education', 'culture', 'trade', 'fishing'],
    crossBorderValue: ['Ghana', 'Togo', 'Benin']
  },
  {
    code: 'ba',
    name: 'Baoulé',
    nativeName: 'Wawle',
    priority: 'medium',
    speakers: 4.5,
    dataAvailability: 'low',
    fineTuningStatus: 'planned',
    modelSize: 'small',
    trainingData: {
      conversational: 200,
      educational: 1000,
      cultural: 500,
      codeSwitching: 2000
    },
    specializations: ['agriculture', 'culture', 'education', 'cocoa farming'],
    crossBorderValue: ['Côte d\'Ivoire']
  },
  {
    code: 'dyu',
    name: 'Dioula',
    nativeName: 'Julakan',
    priority: 'medium',
    speakers: 2.5,
    dataAvailability: 'low',
    fineTuningStatus: 'planned',
    modelSize: 'small',
    trainingData: {
      conversational: 150,
      educational: 800,
      cultural: 400,
      codeSwitching: 1500
    },
    specializations: ['trade', 'business', 'cross-border commerce'],
    crossBorderValue: ['Côte d\'Ivoire', 'Mali', 'Burkina Faso', 'Guinea']
  },
  {
    code: 'ga',
    name: 'Ga',
    nativeName: 'Ga',
    priority: 'medium',
    speakers: 2,
    dataAvailability: 'low',
    fineTuningStatus: 'planned',
    modelSize: 'small',
    trainingData: {
      conversational: 100,
      educational: 500,
      cultural: 300,
      codeSwitching: 1000
    },
    specializations: ['urban culture', 'education', 'fishing', 'tourism'],
    crossBorderValue: ['Ghana']
  },
  {
    code: 'dag',
    name: 'Dagbani',
    nativeName: 'Dagbanli',
    priority: 'medium',
    speakers: 3,
    dataAvailability: 'low',
    fineTuningStatus: 'planned',
    modelSize: 'small',
    trainingData: {
      conversational: 150,
      educational: 800,
      cultural: 400,
      codeSwitching: 1500
    },
    specializations: ['agriculture', 'education', 'culture', 'chieftaincy'],
    crossBorderValue: ['Ghana']
  },
  {
    code: 'mos',
    name: 'Mossi',
    nativeName: 'Mòoré',
    priority: 'medium',
    speakers: 7.5,
    dataAvailability: 'low',
    fineTuningStatus: 'planned',
    modelSize: 'small',
    trainingData: {
      conversational: 200,
      educational: 1000,
      cultural: 500,
      codeSwitching: 2000
    },
    specializations: ['agriculture', 'education', 'culture', 'chieftaincy'],
    crossBorderValue: ['Burkina Faso', 'Mali', 'Togo']
  },
  {
    code: 'son',
    name: 'Songhai',
    nativeName: 'Soŋay',
    priority: 'low',
    speakers: 3.5,
    dataAvailability: 'low',
    fineTuningStatus: 'planned',
    modelSize: 'small',
    trainingData: {
      conversational: 100,
      educational: 500,
      cultural: 300,
      codeSwitching: 1000
    },
    specializations: ['trade', 'history', 'education', 'river commerce'],
    crossBorderValue: ['Mali', 'Niger', 'Burkina Faso', 'Nigeria']
  },
  {
    code: 'zgh',
    name: 'Tamazight',
    nativeName: 'ⵜⴰⵎⴰⵣⵉⵖⵜ',
    priority: 'low',
    speakers: 5,
    dataAvailability: 'medium',
    fineTuningStatus: 'planned',
    modelSize: 'small',
    trainingData: {
      conversational: 200,
      educational: 1000,
      cultural: 500,
      codeSwitching: 2000
    },
    specializations: ['culture', 'heritage', 'education', 'indigenous knowledge'],
    crossBorderValue: ['Morocco', 'Algeria', 'Mali', 'Niger']
  },
  {
    code: 'kab',
    name: 'Kabyle',
    nativeName: 'Taqbaylit',
    priority: 'low',
    speakers: 6,
    dataAvailability: 'medium',
    fineTuningStatus: 'planned',
    modelSize: 'small',
    trainingData: {
      conversational: 250,
      educational: 1200,
      cultural: 600,
      codeSwitching: 2500
    },
    specializations: ['culture', 'literature', 'education', 'indigenous rights'],
    crossBorderValue: ['Algeria', 'Morocco']
  },
  {
    code: 'fon',
    name: 'Fon',
    nativeName: 'Fɔ̀ngbè',
    priority: 'low',
    speakers: 2.5,
    dataAvailability: 'low',
    fineTuningStatus: 'planned',
    modelSize: 'small',
    trainingData: {
      conversational: 100,
      educational: 500,
      cultural: 300,
      codeSwitching: 1000
    },
    specializations: ['culture', 'religion', 'education', 'traditional medicine'],
    crossBorderValue: ['Benin', 'Togo', 'Nigeria']
  },
  {
    code: 'gba',
    name: 'Gbaya',
    nativeName: 'Gbaya',
    priority: 'low',
    speakers: 1.5,
    dataAvailability: 'low',
    fineTuningStatus: 'planned',
    modelSize: 'small',
    trainingData: {
      conversational: 50,
      educational: 250,
      cultural: 150,
      codeSwitching: 500
    },
    specializations: ['hunting', 'agriculture', 'culture', 'forest knowledge'],
    crossBorderValue: ['Central African Republic', 'Cameroon', 'Nigeria']
  }
];

export const getLanguageModelByCode = (code: string): LanguageModelConfig | undefined => {
  return WEST_AFRICAN_LANGUAGE_MODELS.find(model => model.code === code);
};

export const getHighPriorityLanguages = (): LanguageModelConfig[] => {
  return WEST_AFRICAN_LANGUAGE_MODELS.filter(model => model.priority === 'high');
};

export const getLanguagesByRegion = (region: string): LanguageModelConfig[] => {
  return WEST_AFRICAN_LANGUAGE_MODELS.filter(model => 
    model.crossBorderValue.some(country => 
      country.toLowerCase().includes(region.toLowerCase())
    )
  );
};

export const getLanguagesBySpecialization = (specialization: string): LanguageModelConfig[] => {
  return WEST_AFRICAN_LANGUAGE_MODELS.filter(model => 
    model.specializations.includes(specialization)
  );
};

export const getTotalSpeakers = (): number => {
  return WEST_AFRICAN_LANGUAGE_MODELS.reduce((total, model) => total + model.speakers, 0);
};

export const getFineTuningRoadmap = () => {
  const roadmap = {
    phase1: WEST_AFRICAN_LANGUAGE_MODELS.filter(m => m.priority === 'high'),
    phase2: WEST_AFRICAN_LANGUAGE_MODELS.filter(m => m.priority === 'medium'),
    phase3: WEST_AFRICAN_LANGUAGE_MODELS.filter(m => m.priority === 'low')
  };
  
  return {
    ...roadmap,
    totalLanguages: WEST_AFRICAN_LANGUAGE_MODELS.length,
    totalSpeakers: getTotalSpeakers(),
    estimatedTrainingTime: {
      phase1: '6-8 months',
      phase2: '8-10 months', 
      phase3: '10-12 months'
    }
  };
}; 