import { PrismaClient } from "@prisma/client";

const updateCategoryById = async (id, name) => {
  const prisma = new PrismaClient();
  const updatedCategory = await prisma.category.updateMany({
    where: { id },
     data: { name: typeof name === "string" ? name : name.name }
  });
  console.log("updateCategoryById", updatedCategory);
  return {
    message: `Book with id ${id} was updated!`
  }
};

export default updateCategoryById;
