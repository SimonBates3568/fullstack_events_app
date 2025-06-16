import { PrismaClient } from '@prisma/client';

const getUsers = async () => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findMany();
  console.log(user);
  return user;
};

export default getUsers;
