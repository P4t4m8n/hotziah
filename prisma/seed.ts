import {
  PrismaClient,
  ForumType,
  ForumSubject,
  Permission,
  MeetingType,
  Languages,
  TherapistEducation,
  Gender,
} from "@prisma/client";
import { de, faker } from "@faker-js/faker";
import { IUser, IUserDto } from "@/service/models/user.model";
import { IForum } from "@/service/models/forum.model";
import { therapistSignup } from "@/service/server/auth.server";
import { IAddressDto, ITherapistDto } from "@/service/models/therapists.model";

const prisma = new PrismaClient();

const NUM_USERS = 50;
const NUM_FORUMS = 12;
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

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

async function createTherapists() {
  const numberOfTherapists = 100;

  for (let i = 0; i < numberOfTherapists; i++) {
    await delay(500);
    const userDto: IUserDto = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      password: "password123",
      imgUrl: faker.image.avatar(),
      permission: "USER",
      isTherapist: true,
    };

    const therapistDto: Partial<ITherapistDto> = {
      subjects: faker.helpers.arrayElements(
        [
          "Psychology",
          "Counseling",
          "Therapy",
          "Behavioral Therapy",
          "CBT",
          "DBT",
        ],
        3
      ),
      languages: faker.helpers.arrayElements(Object.values(Languages), 3),
      meetingType: faker.helpers.arrayElements(Object.values(MeetingType), 2),
      education: faker.helpers.arrayElements(
        Object.values(TherapistEducation),
        2
      ),
      gender: faker.helpers.arrayElement(Object.values(Gender)),
      phone: faker.phone.number({ style: "human" }),
     
    };

    const address: IAddressDto = {
      city: faker.location.city(),
      street: faker.location.street(),
      number: faker.number.int({ min: 1, max: 100 }).toString(),
      isAccessible: faker.datatype.boolean(),
      zipCode: faker.location.zipCode(),
      floor: faker.number.int({ min: 1, max: 10 }).toString(),
      entrance: faker.number.int({ min: 0, max: 5 }).toString(),
    };

    await therapistSignup(userDto, therapistDto as ITherapistDto, address);
  }
}

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export async function seed() {
  await createTherapists();
  // const usersData = await createUsers();
  // const users = usersData.filter((user) => user.permission === Permission.ADMIN);
  // const forums = await createForums(users);
  // await createPostsAndComments(users, forums);

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

