import { PrismaClient } from "@prisma/client";

const getEvents = async (title, location) => {
  const prisma = new PrismaClient();

  const events = await prisma.event.findMany({
    where: {
      ...(title && { title: { contains: title, mode: "insensitive" } }),
      ...(location && { location: { contains: location, mode: "insensitive" } }),
    },
    include: { categories: true },
  });

  console.log("getEvents", events);
  return events;
};

export default getEvents;
