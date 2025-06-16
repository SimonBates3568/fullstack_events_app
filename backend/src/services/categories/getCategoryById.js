import { PrismaClient } from '@prisma/client';

const getCategoryById = async (id) => {
const prisma = new PrismaClient();
const category = await prisma.category.findUnique({
  where: {id}
})
console.log("getCategoryById", category);

  return category;
};

export default getCategoryById;
