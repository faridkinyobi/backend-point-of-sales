import Joi from 'joi';
import { joiGeneralMessage } from 'src/utils';

export const creactCatagoriesSchema = Joi.object({
  username: Joi.string().min(4).trim().required(),
  email: Joi.string().min(5).trim().required(),
  password: Joi.string().min(6).trim().required(),
});
