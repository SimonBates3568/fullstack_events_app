import { PrismaClient } from "@prisma/client";

const updateUserById = (id, updatedUser) => {
  const prisma = new PrismaClient();
  
  return prisma.user.update({
    where: { id },
    data: {
      name: updatedUser.name,
      password: updatedUser.password,
      username: updatedUser.username,
      image: updatedUser.image
    }
  })
  .then(user => ({
    message: `User with id ${id} successfully updated`,
    user
  }))
  .catch(error => {
    console.error("Error updating user:", error);
    throw new Error(`Could not update user with id ${id}`);
  });
}
export default updateUserById;
