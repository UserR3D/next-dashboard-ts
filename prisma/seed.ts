import { Prisma, PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    password: `12345`,
    posts: {
      create: [
        {
          title: "Join the Prisma Discord",
          description: "https://pris.ly/discord",
          view_p: 0,
          published: true,
        },
        {
          title: "Prisma on YouTube",
          description: "https://pris.ly/youtube",
          view_p: 0,
          published: true
        },
      ],
    },
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    password: "123456",
    posts: {
      create: [
        {
          title: "Follow Prisma on Twitter",
          description: "https://www.twitter.com/prisma",
          published: true,
          view_p: 0,
        },
      ],
    },
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();