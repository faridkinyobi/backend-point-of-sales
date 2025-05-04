import { Router } from 'express';
import { login, register } from './authController';
import { creactCatagoriesSchema } from './authRequest';
import { validateRequest } from 'src/middleware';

const route = Router();

route.post('/register', validateRequest(creactCatagoriesSchema), register);
route.post('/login', login);


export default route;
