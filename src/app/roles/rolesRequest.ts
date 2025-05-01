import Joi from 'joi';
import { joiGeneralMessage } from 'src/utils';

export const creactCatagoriesSchema = Joi.object({
  name: Joi.string()
    .min(4)
    .trim()
    .lowercase()
    .required()
    .valid('admin', 'owner', 'superadmin', 'karsir')
    .messages(joiGeneralMessage),
  action: Joi.array()
    .items(
      Joi.string()
        .lowercase()
        .valid('create', 'read', 'update', 'delete')
        .required(),
    )
    .messages(joiGeneralMessage),
});
