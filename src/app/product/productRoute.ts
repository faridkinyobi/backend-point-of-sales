import { Router } from 'express';
import {
  getAllProduct,
  postProduct,
  getByIdProduct,
  deletProduct,
  updateProduct,
} from './productController';
import { validateRequest } from 'src/middleware';
import { creatProductSchema } from './productRequest';
const route = Router();

route.post('/product', validateRequest(creatProductSchema), postProduct);
route.get('/product', getAllProduct);
route.get('/product/:id', getByIdProduct);
route.delete('/product/:id', deletProduct);
route.put('/product/:id', validateRequest(creatProductSchema), updateProduct);

export default route;
