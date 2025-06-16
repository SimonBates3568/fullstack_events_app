import { PrismaClient } from "@prisma/client";

const deleteEventById = (id) => {
  const prisma = new PrismaClient();

  const deleteEventById = prisma.event.delete({
    where: { id },
  });

  if (!deleteEventById || deleteEventById.count === 0) {
    throw new Error(`Event with id ${id} not found`);
  }
  return deleteEventById;
};


export default deleteEventById;
