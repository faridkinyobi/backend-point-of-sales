import { Router } from 'express';
import {
  getCategories,
  postCategories,
  getByIdCategories,
  deleteCategories
} from './catagoriesController';

const route = Router();

route.get('/catagories', getCategories);
route.post('/catagories', postCategories);
route.get('/catagories/:id', getByIdCategories);
route.delete('/catagories/:id', deleteCategories);

export default route;
