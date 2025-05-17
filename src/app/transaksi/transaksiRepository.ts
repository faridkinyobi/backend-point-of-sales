import { db } from 'src/utils';
import { interTransaksiTDOs } from './transaksiInterface';
import { QueryParams } from 'src/interface';

export const createData = (payload: interTransaksiTDOs) => {
  // console.log(payload)
  return db.$transaction(async (db) => {
    const transaksis = await db.transaksi.create({
      data: {
        userId: payload.userId,
        totalPrice: payload.totalPrice,
        payAmount: payload.payAmount,
        refund: payload.refund,
      },
      // include: { DatailTransakti: true },
    });
    // console.log(payload);
    await db.datailTransakti.createMany({
      data: payload.datailTransakti.map((detail) => ({
        orderId: transaksis.id,
        productId: detail.productId,
        name: detail.name,
        unitPrice: detail.unitPrice,
        qty: detail.qty,
        totalUnitPrice: detail.totalUnitPrice,
      })),
    });
    for (const detail of payload.datailTransakti) {
      await db.product.update({
        where: { id: detail.productId },
        data: {
          stok: {
            decrement: detail.qty,
          },
        },
      });
    }
    // console.log(detailTransaksiResult)
    return transaksis;
  });
};

export const getProductFind = (id: string[]) => {
  // const { search = '', page = '1', perPage = '10' } = query;
  // const trimmedSearch = search.trim();
  return db.product.findMany({
    where: {
      id: {
        in: id,
      },
    },
  });
};

export const Counte = () => {
  return db.product.count();
};

export const getFindUser = (id: string) => {
  return db.user.findUnique({ where: { id } });
};
// check product
export const getProductId = (id: string) => {
  return db.product.findUnique({ where: { id } });
};

// export const updatet = (product: productDTO, id: string) => {
//   return db.product.update({ where: { id }, data: { ...product } });
// };

// export const destroy = (id: string) => {
//   return db.product.delete({ where: { id } });
// };
