import Joi from 'joi';
import { joiGeneralMessage } from 'src/utils';

export const creactCatagoriesSchema = Joi.object({
  name: Joi.string().min(4).trim().required().messages(joiGeneralMessage),
});
