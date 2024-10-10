export const COLLECTIONS = [
  "articles",
  "discussions",
  "forms",
  "users",
  "therapists",
  "questionnaire",
] as const;

export type TCollectionName = (typeof COLLECTIONS)[number];
