import { Router } from 'express';
import {
  // getAllTransaksi,
  postTransaksi,
  // getByIdTransaksi,
  // deletTransaksi,
  // updateTransaksi,
} from './transaksiController';
import { validateRequest } from 'src/middleware';
import { creatTransaksiSchema } from './transaksiRequest';
import { authentication } from 'src/middleware';
const route = Router();

route.post(
  '/transaksi',
  validateRequest(creatTransaksiSchema),
  authentication,
  postTransaksi,
);
// route.get('/transaksi', getAllTransaksi);
// route.get('/transaksi/:id', getByIdTransaksi);
// route.delete('/transaksi/:id', deletTransaksi);
// route.put('/transaksi/:id', validateRequest(creatTransaksiSchema), updateTransaksi);

export default route;
