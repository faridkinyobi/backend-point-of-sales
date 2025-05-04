import Joi from 'joi';
import { joiGeneralMessage } from 'src/utils';
export const creactCatagoriesSchema = Joi.object({
  username: Joi.string().min(5).trim().required().messages(joiGeneralMessage),
  email: Joi.string().min(5).trim().required().messages(joiGeneralMessage),
  password: Joi.string().min(6).trim().required().messages(joiGeneralMessage),
  // confirmpassowrd: Joi.string()
  //   .min(6)
  //   .trim()
  //   .valid(Joi.ref('password'))
  //   .required()
  //   .messages(joiGeneralMessage),

  confirmpassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .min(6)
    .trim()
    .messages({
      ...joiGeneralMessage,
      'any.only': '{{#label}} and password do not match',
    }),
  roleId: Joi.string().uuid().required(),
});
