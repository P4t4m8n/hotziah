import {
  PrismaClient,
  ForumType,
  ForumSubject,
  Permission,
} from "@prisma/client";
import { faker } from "@faker-js/faker";
import { IUser } from "@/service/models/user.model";
import { IForum } from "@/service/models/forum.model";

const prisma = new PrismaClient();

const NUM_USERS = 10;
const NUM_FORUMS = 12;

async function createUsers() {
  const users = [];
  for (let i = 0; i < NUM_USERS; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        imgUrl: faker.image.avatar(),
        permission: faker.helpers.arrayElement([
          Permission.USER,
          Permission.MODERATOR,
          Permission.ADMIN,
        ]),
      },
    });
    users.push(user);
  }
  return users;
}

async function createForums(users: IUser[]) {
  const forums = [];
  for (let i = 0; i < NUM_FORUMS; i++) {
    const forum = await prisma.forum.create({
      data: {
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        type: faker.helpers.arrayElement([
          ForumType.PUBLIC,
          ForumType.PRIVATE,
          ForumType.RESTRICTED,
          ForumType.TECHNICAL,
        ]),
        subjects: faker.helpers.arrayElements(Object.values(ForumSubject), 2),
        admins: {
          connect: [...users],
        },
      },
    });
    forums.push(forum);
  }
  return forums;
}

async function createPostsAndComments(
  users: IUser[],
  forums: Partial<IForum>[]
) {
  for (const forum of forums) {
    for (let i = 0; i < getRandomNumber(10, 50); i++) {
      const author = users[Math.floor(Math.random() * users.length)];
      const post = await prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(2),
          authorId: author.id!,
          forumId: forum.id!,
        },
      });

      for (let j = 0; j < getRandomNumber(3, 20); j++) {
        const commenter = users[Math.floor(Math.random() * users.length)];
        const comment = await prisma.comment.create({
          data: {
            content: faker.lorem.sentence(),
            authorId: commenter.id!,
            postId: post.id!,
          },
        });

        for (let k = 0; k < getRandomNumber(0, 10); k++) {
          const replier = users[Math.floor(Math.random() * users.length)];
          await prisma.comment.create({
            data: {
              content: faker.lorem.sentences(2),
              authorId: replier.id!,
              postId: post.id!,
              parentId: comment.id!,
            },
          });
        }
      }
    }
  }
}

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export async function seed() {
  const usersData = await createUsers();
  const users = usersData.filter((user) => user.permission === Permission.ADMIN);
  const forums = await createForums(users);
  await createPostsAndComments(users, forums);

  console.info("Database seeded successfully");
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
