import { db } from 'src/utils';
import { productDTO } from './productInterface';
import { QueryParams } from 'src/interface';

export const createData = (product: productDTO) => {
  return db.product.create({ data: product });
};

export const getFind = (query: QueryParams) => {
  const { search = '', page = '1', perPage = '10' } = query;
  const trimmedSearch = search.trim();
  return db.product.findMany({
    where: {
      OR: [
        { name: { contains: trimmedSearch } },
        { desc: { contains: trimmedSearch } },
        {
          price: {
            equals: isNaN(Number(trimmedSearch))
              ? undefined
              : Number(trimmedSearch),
          },
        },
        {
          qty: {
            equals: isNaN(Number(trimmedSearch))
              ? undefined
              : Number(trimmedSearch),
          },
        },
        {
          catagory: {
            name: { contains: trimmedSearch },
          },
        },
      ],
    },
    include: {
      catagory: {
        select: {
          name: true,
        },
      },
    },
    omit: {
      catagoryId: true,
    },
    skip: (Number(page) - 1) * Number(perPage),
    take: Number(perPage),
  });
};

export const Counte = () => {
  return db.product.count();
};

export const getFindCategories = (id: string) => {
  return db.catagory.findUnique({ where: { id } });
};

export const getfindId = (id: string) => {
  return db.product.findUnique({ where: { id } });
};

export const updatet = (product: productDTO, id: string) => {
  return db.product.update({ where: { id }, data: { ...product } });
};

export const destroy = (id: string) => {
  return db.product.delete({ where: { id } });
};
