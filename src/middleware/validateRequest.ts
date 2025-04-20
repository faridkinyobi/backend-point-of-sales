import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { AppError } from './handler-error';
import { ERROR_CODE } from 'src/interface';
import { joiClearMessage } from 'src/utils';

export const validateRequest = (
  schema: Joi.ObjectSchema,
  type: 'params' | 'body' | 'query' = 'body',
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const tagetError =
      type === 'params' ? req.params : type === 'query' ? req.query : req.body;

    const err = schema.validate(tagetError, { abortEarly: false }).error;
    
    if (err) {
      throw new AppError(ERROR_CODE.BAD_REQUEST.code, joiClearMessage(err));
    }
    next();
  };
};
