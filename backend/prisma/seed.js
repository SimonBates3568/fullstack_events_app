import { PrismaClient } from "@prisma/client";
import eventsData from "../src/data/events.json" with { type: "json" };
import userData from "../src/data/users.json" with { type: "json" };
import categoryData from "../src/data/categories.json" with { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { events } = eventsData;
  const { users } = userData;
  const { categories } = categoryData;

  // Seed categories
  for (const category of categories) {
    console.log(`Seeding category: ${category.name}`);
    await prisma.category.upsert({
      where: { id: Number(category.id) },
      update: {},
      create: { ...category, id: Number(category.id) },
    });
  }

  // Seed users
  for (const user of users) {
    console.log(`Seeding user: ${user.name}`);
    await prisma.user.upsert({
      where: { id: String(user.id)},
      update: {},
      create: { ...user, id: String(user.id) },
    });
  }

  // Seed events
  for (const event of events) {
    console.log(`Seeding event: ${event.title}`);
    const { categoryIds, createdBy, ...eventData } = event;
    await prisma.event.upsert({
      where: { id: String(event.id) },
      update: {},
      create: {
        ...eventData,
        id: String(event.id),
        startTime: new Date(event.startTime),
        endTime: new Date(event.endTime),
        categories: {
          connect: event.categoryIds.map((id) => ({ id: Number(id) })),
        },
        createdBy: event.createdBy
          ? { connect: { id: String(event.createdBy) } }
          : undefined,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });