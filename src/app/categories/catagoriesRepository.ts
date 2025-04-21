import { db } from 'src/utils';

export const creatData = (body: { name: string }) => {
  return db.catagory.create({ data: body });
};

export const getAll = () => {
  return db.catagory.findMany();
};

export const getfindId = async (id: string) => {
  return db.catagory.findUnique({ where: { id } });
};
export const getfindName = async (body: { name: string }) => {
  return db.catagory.findUnique({
    where: { name: body.name },
  });
};

export const updatet = async (body: { name: string }, id: string) => {
  return db.catagory.update({ where: { id }, data: { ...body } });
};

export const destroy = (id: string) => {
  return db.catagory.delete({ where: { id } });
};
