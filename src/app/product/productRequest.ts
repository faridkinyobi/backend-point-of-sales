import Joi from 'joi';
import { joiGeneralMessage } from 'src/utils';

export const creatProductSchema = Joi.object({
  name: Joi.string().min(3).required().messages(joiGeneralMessage),
  price: Joi.number().strict().min(3).required().messages(joiGeneralMessage),
  qty: Joi.number().strict().min(1).required().messages(joiGeneralMessage),
  desc: Joi.string().min(5).optional(),
  catagoryId: Joi.string().guid().required().messages(joiGeneralMessage),
});
