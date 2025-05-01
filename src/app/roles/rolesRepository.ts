import { db } from 'src/utils';

export const creatData = (body: { name: string; action: string[] }) => {
  return db.role.create({
    data: {
      name: body.name.toLocaleLowerCase(),
      permission: {
        create: body.action.map((action) => ({ action })),
      },
    },
    include: { permission: { select: { id: true, action: true } } }, // Include permission
  });
};

export const getAll = () => {
  return db.role.findMany({
    include: { permission: { select: { id: true, action: true } } },
  });
};

export const getfindId = async (id: string) => {
  return db.role.findUnique({
    where: { id },
    include: { permission: { select: { id: true, action: true } } },
  });
};
export const getfindName = async (body: { name: string }) => {
  return db.role.findUnique({
    where: { name: body.name },
  });
};

export const updatet = async (
  body: { name: string; action: string[] },
  id: string,
) => {
  return db.role.update({
    where: { id },
    data: {
      name: body.name.toLocaleLowerCase(),
      permission: {
        deleteMany: {}, // Delete all existing permissions
        create: body.action.map((action) => ({ action })), // Create new
      },
    },
    include: { permission: { select: { id: true, action: true } } }, // Include permission
  });
};

export const destroy = (id: string) => {
  return db.role.delete({ where: { id } });
};
