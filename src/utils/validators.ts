import Joi from 'joi';

export const userValidation = {
  create: Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(50).required(),
    profile: Joi.object({
      age: Joi.number().min(1).max(120),
      education: Joi.string(),
      occupation: Joi.string(),
      location: Joi.object({
        country: Joi.string(),
        region: Joi.string(),
        city: Joi.string(),
      }),
      interests: Joi.array().items(Joi.string()),
      goals: Joi.array().items(Joi.string()),
      challenges: Joi.array().items(Joi.string()),
    }),
    preferences: Joi.object({
      language: Joi.string(),
      contentFormat: Joi.string().valid('text', 'audio', 'video', 'mixed'),
      interactionStyle: Joi.string().valid('guided', 'exploratory', 'challenging'),
      feedbackFrequency: Joi.string().valid('immediate', 'periodic', 'on-demand'),
    }),
  }),

  update: Joi.object({
    name: Joi.string().min(2).max(50),
    profile: Joi.object({
      age: Joi.number().min(1).max(120),
      education: Joi.string(),
      occupation: Joi.string(),
      location: Joi.object({
        country: Joi.string(),
        region: Joi.string(),
        city: Joi.string(),
      }),
      interests: Joi.array().items(Joi.string()),
      goals: Joi.array().items(Joi.string()),
      challenges: Joi.array().items(Joi.string()),
    }),
    preferences: Joi.object({
      language: Joi.string(),
      contentFormat: Joi.string().valid('text', 'audio', 'video', 'mixed'),
      interactionStyle: Joi.string().valid('guided', 'exploratory', 'challenging'),
      feedbackFrequency: Joi.string().valid('immediate', 'periodic', 'on-demand'),
    }),
  }),
};

export const learningValidation = {
  chat: Joi.object({
    message: Joi.string().min(1).max(1000).required(),
    context: Joi.object().optional(),
  }),

  session: Joi.object({
    topic: Joi.string().min(1).max(200).required(),
    difficulty: Joi.string().valid('beginner', 'intermediate', 'advanced'),
    duration: Joi.number().min(5).max(180),
  }),
};

export const validateRequest = (schema: Joi.ObjectSchema, data: any) => {
  return schema.validate(data, { abortEarly: false });
}; 