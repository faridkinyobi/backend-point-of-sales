import { Router } from 'express';
import {
  getRoles,
  postRoles,
  getByIdRoles,
  deleteRoles,
  updateRoles,
} from './rolesController';
import { creactCatagoriesSchema } from './rolesRequest';
import { validateRequest } from 'src/middleware';

const route = Router();

route.get('/roles', getRoles);
route.post('/roles', validateRequest(creactCatagoriesSchema), postRoles);
route.put('/roles/:id', validateRequest(creactCatagoriesSchema), updateRoles);
route.get('/roles/:id', getByIdRoles);
route.delete('/roles/:id', deleteRoles);

export default route;
