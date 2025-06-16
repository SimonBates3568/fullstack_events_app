import { PrismaClient } from '@prisma/client';

const createUser = (username, name, password, image) => {
  const prisma = new PrismaClient();
  const newUser = { username, name, password, image };
  const user = prisma.user.create({
    data: newUser,
  });
  console.log(user);
  return user;
};

export default createUser;
