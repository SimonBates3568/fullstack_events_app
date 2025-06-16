import { PrismaClient } from "@prisma/client";

const deleteUserById = async (id) => {
 const prisma = new PrismaClient();
 const deleteUserById = await prisma.user.delete({
   where: { id },
 });
 if (!deleteUserById || deleteUserById.count === 0) {
   throw new NotFoundError("User", id);
 }
 console.log(`User with id ${id} successfully deleted`);
 return deleteUserById;
};

export default deleteUserById;
