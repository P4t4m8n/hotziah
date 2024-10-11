export const COLLECTIONS = [
  "articles",
  "forums",
  "users",
  "therapists",
  "questionnaires",
  "posts",
  "threads",
] as const;

export type TCollectionName = (typeof COLLECTIONS)[number];
