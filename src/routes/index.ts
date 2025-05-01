import { Router } from 'express';
import catagoryRouter from '../app/categories/catagoriesRoute';
import productRouter from '../app/product/productRoute';
import rolesRouter from '../app/roles/rolesRoute';
const route = Router();

route.use('/app', catagoryRouter);
route.use('/app', productRouter);
route.use('/app', rolesRouter);

export default route;
