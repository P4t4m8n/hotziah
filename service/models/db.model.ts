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

export interface IPipelineStage {
  $match?: Record<string, unknown>;
  $lookup?: {
    from: string;
    localField?: string;
    foreignField?: string;
    as: string;
    let?: Record<string, unknown>;
    pipeline?: Record<string, unknown>[];
  };
  $addFields?: Record<string, unknown>;
  $project?: Record<string, unknown>;
  $regex?: Record<string, unknown>;
  $unwind?: string|Record<string, unknown>;
  $sort?: Record<string, unknown>;
  $limit?: number;
  $group?: Record<string, unknown>;
}
