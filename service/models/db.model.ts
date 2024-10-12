export const COLLECTIONS = [
  "articles",
  "forums",
  "users",
  "therapists",
  "questionnaires",
  "posts",
  "threads",
  "sessions",
] as const;

export type TCollectionName = (typeof COLLECTIONS)[number];
export type TModelCollectionName = Exclude<TCollectionName, "sessions">;

