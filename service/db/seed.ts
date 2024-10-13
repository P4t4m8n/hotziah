import { ObjectId } from "mongodb";
import { faker } from "@faker-js/faker";
import { IUserDto } from "../models/user.model";
import { FORUM_TYPE, IForumDto } from "../models/forum.model";
import { IThreadDto } from "../models/thread.model";
import { IPostDto } from "../models/posts.model";
import { getCollection } from "./mongo";

// Function to create random users
const createRandomUser = (): IUserDto => {
  return {
    username: faker.internet.userName(),
    imgUrl: faker.image.avatar(),
    permission: "user",
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: "1234",
  };
};

// Function to create random forums
const createRandomForum = (_admins: ObjectId[]): IForumDto => {
  const admins = _admins.map((admin) => new ObjectId(admin));

  return {
    _id: new ObjectId(),
    name: faker.lorem.words(3),
    description: faker.lorem.sentences(2),
    admins,
    type: FORUM_TYPE[Math.floor(Math.random() * FORUM_TYPE.length)],
  };
};

// Function to create random threads for a given forum
const createRandomThread = (
  forumId: ObjectId,
  authorId: ObjectId
): IThreadDto => {
  return {
    _id: new ObjectId(),
    forumId: forumId,
    authorId: authorId,
    name: faker.lorem.words(4),
  };
};

// Function to create random posts for a given thread
const createRandomPost = (
  threadId: ObjectId,
  authorId: ObjectId,
  parentId: ObjectId | null = null
): IPostDto => {
  return {
    _id: new ObjectId(),
    parentId: parentId ?? threadId,
    authorId: authorId,
    content: faker.lorem.paragraphs(2),
  };
};

// Seed function to insert random data into the database
export async function seedDemoData(
  userCount: number = 5,
  forumCount: number = 3,
  threadCount: number = 10,
  postCount: number = 50
) {
  // Generate users
  const users: IUserDto[] = Array.from({ length: userCount }, createRandomUser);

  const usersCollection = await getCollection<IUserDto>("users");
  const { insertedIds } = await usersCollection.insertMany(users);
  const insertedIdsObject = Object.values(insertedIds).map((id) => id);

  // Generate forums
  const forums: IForumDto[] = Array.from({ length: forumCount }, () =>
    createRandomForum(insertedIdsObject)
  );

  // Insert forums into the "forums" collection
  const forumsCollection = await getCollection<IForumDto>("forums");
  const { insertedIds: forumInsertedIds } = await forumsCollection.insertMany(
    forums
  );

  const forumIds = Object.values(forumInsertedIds).map((id) => id);
  // Generate threads and posts
  const threads: IThreadDto[] = [];
  const posts: IPostDto[] = [];

  forumIds.forEach((forum) => {
    for (let i = 0; i < threadCount; i++) {
      const randomUser =
        insertedIdsObject[Math.floor(Math.random() * users.length)];
      const thread = createRandomThread(forum, randomUser);
      threads.push(thread);
    }
  });

  const theadsCollection = await getCollection<IThreadDto>("threads");
  const { insertedIds: threadInsertedIds } = await theadsCollection.insertMany(
    threads
  );
  const threadIds = Object.values(threadInsertedIds).map((id) => id);

  threadIds.forEach((thread) => {
    for (let i = 0; i < postCount; i++) {
      const randomUser =
        insertedIdsObject[Math.floor(Math.random() * users.length)];
      const post = createRandomPost(thread, randomUser);
      posts.push(post);
    }
  });

  const postsCollection = await getCollection<IPostDto>("posts");
  await postsCollection.insertMany(posts);

  console.info("Demo data seeded successfully!");
}
