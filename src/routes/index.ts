import { Router } from 'express';
import catagoryRouter from '../app/categories/catagoriesRoute';

const route = Router();
route.use('/app', catagoryRouter);

export default route;
