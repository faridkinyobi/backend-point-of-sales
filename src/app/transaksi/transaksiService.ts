import { AppError } from 'src/middleware';
import { interTransaksiTDOs } from './transaksiInterface';
import * as transaksiRepository from './transaksiRepository';
import { ERROR_CODE, QueryParams } from 'src/interface';
import { metaPagination } from 'src/utils/pagination';
// transaksi
export const creatData = async (body: interTransaksiTDOs, userId: string) => {
  // console.log(body);
  const userExists = await transaksiRepository.getFindUser(userId);
  // console.log(userId);
  if (!userExists) {
    throw new AppError(ERROR_CODE.NOT_FOUND.code, 'User not found');
  }

  // kerjang id items
  const basketIdItems = body.keranjang.map((items) => items.producId);

  // check the product one to one
  for (const id of basketIdItems) {
    const checkIdProduct = await transaksiRepository.getProductId(id);

    if (!checkIdProduct) {
      throw new AppError(ERROR_CODE.NOT_FOUND.code, 'product not found');
    }
  }

  // search for many products
  const productMany = await transaksiRepository.getProductFind(basketIdItems);
  const keranjangitems = body.keranjang;

  const totalPrice = keranjangitems.reduce((sum, item) => {
    // matching product id with keranjang id
    const matchedProduct = productMany.find((p) => p.id === item.producId);

    const itemPrice = matchedProduct ? Number(matchedProduct.price) : 0;
    return sum + itemPrice * item.qty;
  }, 0);


  const payload: interTransaksiTDOs = {
    userId: userId,
    totalPrice: totalPrice,
    payAmount: body.payAmount,
    refund: body.payAmount - totalPrice,
    keranjang: keranjangitems,
    datailTransakti: keranjangitems
      .map((keranjangItem) => {
        const productItems = productMany.find(
          (items) => items.id === keranjangItem.producId,
        );
        if (!productItems) return null;

        return {
          productId: productItems.id,
          name: productItems.name,
          unitPrice: Number(productItems.price),
          qty: keranjangItem.qty,
          totalUnitPrice: Number(productItems.price) * keranjangItem.qty,
        };
      })
      .filter((item) => item !== null),
  };
  // console.log(payload);
  const transaksi = await transaksiRepository.createData(payload);
  // console.log(transaksi);
  if (!transaksi) {
    throw new AppError(
      ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      'Creat product failed',
    );
  }
  return transaksi;
};
