import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();
db.$connect()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log('Failed to connect to the database:', err);
  });
