/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedProjects() {
  const projects = [
    {
      title: 'Demo Project One',
      slug: 'demo-project-one',
      description: 'First demo project',
      image: '/images/placeholder.png',
      stacks: 'Next.js, Tailwind, Prisma',
      is_show: true,
      is_featured: true,
    },
    {
      title: 'Demo Project Two',
      slug: 'demo-project-two',
      description: 'Second demo project',
      image: '/images/placeholder.png',
      stacks: 'React, SWR',
      is_show: true,
      is_featured: false,
    },
  ];

  for (const p of projects) {
    await prisma.projects.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
}

async function seedContentMeta() {
  const metas = [
    { slug: 'demo-project-one', type: 'project', views: 10 },
    { slug: 'demo-project-two', type: 'project', views: 5 },
    { slug: 'hello-world', type: 'blog', views: 42 },
  ];

  for (const m of metas) {
    await prisma.contentmeta.upsert({
      where: { slug: m.slug },
      update: m,
      create: m,
    });
  }
}

async function main() {
  await seedProjects();
  await seedContentMeta();
}

main()
  .then(async () => {
    console.log('✅ Seeded dummy data');
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });










