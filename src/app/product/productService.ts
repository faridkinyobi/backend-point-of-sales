import { AppError } from 'src/middleware';
import { productDTO } from './productInterface';
import * as productRepository from './productRepository';
import { ERROR_CODE, QueryParams } from 'src/interface';
import { metaPagination } from 'src/utils/pagination';

// creat product
export const creatData = async (body: productDTO) => {
  const CheckCategory = await productRepository.getFindCategories(
    body.catagoryId,
  );
  if (!CheckCategory) {
    throw new AppError(ERROR_CODE.NOT_FOUND.code, 'Catagories not found');
  }
  const product = await productRepository.createData(body);

  if (!product) {
    throw new AppError(
      ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      'Creat product failed',
    );
  }
  return product;
};

// get all data product
export const getAllData = async (query: QueryParams) => {
  const { page = 1, perPage = 10 } = query;

  const [product, totalData] = await Promise.all([
    productRepository.getFind(query),
    productRepository.Counte(),
  ]);
  if (!product) {
    throw new AppError(ERROR_CODE.NOT_FOUND.code, 'Product not found');
  }
  const meta = metaPagination(
    Number(page),
    Number(perPage),
    product.length,
    totalData,
  );

  return { product, pegination: meta };
};

//get by Id product
export const getBayID = async (id: string) => {
  const product = await productRepository.getfindId(id);
  if (!product) {
    throw new AppError(ERROR_CODE.NOT_FOUND.code, 'Product not found');
  }
  return product;
};

// delet product
export const deletes = async (id: string) => {
  // check product
  await getBayID(id);

  const product = await productRepository.destroy(id);
  if (!product) {
    throw new AppError(
      ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      'Delete product failed',
    );
  }
  return product;
};

// update product
export const updates = async (body: productDTO, id: string) => {
  // check product
  await getBayID(id);

  const product = await productRepository.updatet(body, id);

  if (!product) {
    throw new AppError(
      ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      'Update product failed',
    );
  }
  return product;
};
