import Joi from 'joi';
import { joiGeneralMessage } from 'src/utils';

const keranjang = Joi.object({
  producId: Joi.string().guid().required().messages(joiGeneralMessage),
  qty: Joi.number().strict().required().messages(joiGeneralMessage),
});
export const creatTransaksiSchema = Joi.object({
  keranjang: Joi.array().items(keranjang),
  payAmount: Joi.number().min(3),
});
