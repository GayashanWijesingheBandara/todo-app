import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(100).required().messages({
    'string.empty': 'Title is required',
    'string.max': 'Title must be less than 100 characters',
    'any.required': 'Title is required'
  }),
  description: Joi.string().min(1).max(500).required().messages({
    'string.empty': 'Description is required',
    'string.max': 'Description must be less than 500 characters',
    'any.required': 'Description is required'
  })
});

export const validateCreateTask = (req: Request, res: Response, next: NextFunction) => {
  const { error } = createTaskSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details.map(detail => detail.message)
    });
  }
  
  next();
};

export const validateTaskId = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      error: 'Invalid task ID'
    });
  }
  
  req.params.id = id.toString();
  next();
};