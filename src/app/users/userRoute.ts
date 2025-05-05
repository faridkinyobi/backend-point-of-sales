import { Router } from 'express';
import { getUser, deleteUser } from './usersController';

const route = Router();

route.get('/user', getUser);
route.delete('/user/:id', deleteUser);

export default route;
