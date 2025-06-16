import { PrismaClient } from '@prisma/client';

const getCategories = async () => {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany();
  console.log(categories);
  return categories;
}

export default getCategories;
