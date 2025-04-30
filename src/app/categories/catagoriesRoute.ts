import { Router } from 'express';
import {
  getCategories,
  postCategories,
  getByIdCategories,
  deleteCategories,
  updateCategories,
} from './catagoriesController';
import { creactCatagoriesSchema } from './catagoriesRequest';
import { validateRequest } from 'src/middleware';

const route = Router();

route.get('/catagories', getCategories);
route.post(
  '/catagories',
  validateRequest(creactCatagoriesSchema),
  postCategories,
);
route.put(
  '/catagories/:id',
  validateRequest(creactCatagoriesSchema),
  updateCategories,
);
route.get('/catagories/:id', getByIdCategories);
route.delete('/catagories/:id', deleteCategories);

export default route;
