import { PrismaClient } from '@prisma/client';

const createEvent = async (
  title,
  description,
  location,
  image,
  startTime,
  endTime,
  createdBy,
  categoryIds
) => {
  const prisma = new PrismaClient();

  // Ensure startTime and endTime are valid ISO strings
  const fixedStartTime = new Date(startTime).toISOString();
  const fixedEndTime = new Date(endTime).toISOString();

  const event = await prisma.event.create({
    data: {
  
      title,
      description,
      location,
      image,
      startTime: fixedStartTime,
      endTime: fixedEndTime,
      createdBy: createdBy
        ? { connect: { id: String(createdBy) } }
        : undefined,
      categories: {
        connect: categoryIds.map(id => ({ id: Number(id) })),
      },
    },
  });
  console.log(event);
  return event;
};



export default createEvent;
