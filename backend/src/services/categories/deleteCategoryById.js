import { PrismaClient } from '@prisma/client';

const deleteCategoryById = async (id) => {
  const prisma = new PrismaClient()

  const deleteCategoryById = await prisma.category.delete({
    where: { id },
  });

 if (!deleteCategoryById || deleteCategoryById.count === 0) {
    throw new NotFoundError('Book', id)
  }
  return deleteCategoryById;
};

export default deleteCategoryById;
