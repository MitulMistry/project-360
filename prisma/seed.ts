import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create users
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice Taylor",
    },
  });

  const zack = await prisma.user.upsert({
    where: { email: "zack@prisma.io" },
    update: {},
    create: {
      email: "zack@prisma.io",
      name: "Zack Smith",
    },
  });

  const dan = await prisma.user.upsert({
    where: { email: "dan@prisma.io" },
    update: {},
    create: {
      email: "dan@prisma.io",
      name: "Dan Russel",
    },
  });

  const holly = await prisma.user.upsert({
    where: { email: "holly@prisma.io" },
    update: {},
    create: {
      email: "holly@prisma.io",
      name: "Holly Davis",
    },
  });

  const robin = await prisma.user.upsert({
    where: { email: "robin@prisma.io" },
    update: {},
    create: {
      email: "robin@prisma.io",
      name: "Robin Brooks",
    },
  });

  // Create organizations
  const orgDev = await prisma.organization.create({
    data: {
      name: "Development Team",
    },
  });

  const orgDesign = await prisma.organization.create({
    data: {
      name: "Design Team",
    },
  });

  // Add users to organizations
  for (const user of [alice, zack, dan, holly]) {
    await prisma.organizationUser.create({
      data: {
        userId: user.id,
        organizationId: orgDev.id,
      },
    });
  }

  for (const user of [zack, holly, robin]) {
    await prisma.organizationUser.create({
      data: {
        userId: user.id,
        organizationId: orgDesign.id,
      },
    });
  }

  // Create Projects and Tasks
  await prisma.project.create({
    data: {
      name: "Project 1",
      organizationId: orgDev.id,
      tasks: {
        create: [
          { name: "Task 1", assigneeId: alice.id },
          { name: "Task 2", assigneeId: zack.id, status: "INPROGRESS" },
          { name: "Task 3", assigneeId: dan.id, priority: "HIGH" },
          {
            name: "Task 4",
            assigneeId: holly.id,
            status: "STUCK",
            priority: "MEDIUM",
          },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      name: "Project 2",
      organizationId: orgDev.id,
      tasks: {
        create: [
          { name: "Task 1", assigneeId: dan.id, status: "INPROGRESS" },
          { name: "Task 2", assigneeId: holly.id },
          { name: "Task 3", assigneeId: dan.id, priority: "CRITICAL" },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      name: "Project 3",
      organizationId: orgDesign.id,
      tasks: {
        create: [
          { name: "Task 1", assigneeId: zack.id, status: "INPROGRESS" },
          { name: "Task 2", assigneeId: holly.id },
          { name: "Task 3", assigneeId: robin.id, priority: "CRITICAL" },
        ],
      },
    },
  });
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
