import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updateEventById = async (id, updatedEvent) => {
  const { categoryIds, createdBy, ...rest } = updatedEvent;
  try {
    const event = await prisma.event.update({
      where: { id: String(id) },
      data: {
        ...rest,
        createdBy: createdBy
          ? { connect: { id: createdBy } }
          : undefined,
        categories:
          Array.isArray(categoryIds) && categoryIds.length > 0 && categoryIds[0] !== 0
            ? { set: categoryIds.map((catId) => ({ id: Number(catId) })) }
            : undefined,
      },
    });
    return event;
  } catch (error) {
    console.error("Prisma update error:", error);
    throw error;
  }
};


export default updateEventById;