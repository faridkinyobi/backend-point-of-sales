import { QueryParams } from 'src/interface';
import { db } from 'src/utils';

export const getAll = (query: QueryParams) => {
  const { search = '', page = '1', perPage = '10' } = query;

  const trimmedSearch = search.trim();

  return db.user.findMany({
    where: {
      OR: [
        {
          username: {
            contains: trimmedSearch,
          },
        },
        {
          email: {
            contains: trimmedSearch,
          },
        },
      ],
    },
    include: {
      role: {
        select: { name: true },
      },
    },
    skip: (Number(page) - 1) * Number(perPage),
    take: Number(perPage),
  });
};

export const count = async () => {
  return db.user.count();
};

export const getfindId = async (id: string) => {
  return db.role.findUnique({
    where: { id },
    include: { permission: { select: { id: true, action: true } } },
  });
};

export const destroy = (id: string) => {
  return db.user.delete({ where: { id } });
};
