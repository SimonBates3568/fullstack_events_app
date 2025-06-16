import { PrismaClient } from "@prisma/client";

const getEvents = (title, location) => {
  const prisma = new PrismaClient();

  const categories = prisma.event.findMany();
  console.log("getEvents", categories);
  return categories;
};

export default getEvents;
