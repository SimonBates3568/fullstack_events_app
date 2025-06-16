import { PrismaClient } from "@prisma/client";

const getEventById = (id) => {
 const prisma = new PrismaClient();
 const event = prisma.event.findUnique({
  where: {id}
 })
 console.log("getEventById", event);
  return event;
};

export default getEventById;
