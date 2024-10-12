import { ObjectId } from "mongodb";
import { IThread, IThreadDto, IThreadFilter } from "../models/thread.model";
import { IModelConfig } from "../models/server.model";

const toDto = (thread: IThread): IThreadDto => {
  const { _id, forumId, author, ...rest } = thread;
  return {
    ...rest,
    _id: new ObjectId(_id),
    forumId: new ObjectId(forumId),
    authorId: new ObjectId(author._id),
  };
};

const buildPipeline = (filter: IThreadFilter) => {
  const pipeline = [];

  if (filter.name) {
    pipeline.push({ $match: { name: filter.name } });
  }

  if (filter.forumId) {
    pipeline.push({ $match: { forumId: new ObjectId(filter.forumId) } });
  }

  if (filter.authorId) {
    pipeline.push({ $match: { authorId: new ObjectId(filter.authorId) } });
  }

  if (filter._id) {
    pipeline.push({ $match: { _id: new ObjectId(filter._id) } });
  }

  if (filter.postId) {
    pipeline.push({
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "$threadId",
        as: "posts",
      },
    });
    pipeline.push({ $match: { "posts._id": new ObjectId(filter.postId) } });
  }

  const project = {
    $project: {
      _id: { $toString: "$_id" },
      name: 1,
      forumId: { $toString: "$forumId" },
      author: {
        _id: { $toString: "$author._id" },
        username: "$author.username",
        imgUrl: "$author.imgUrl",
      },
    },
  };

  pipeline.push(project);

  return pipeline;
};

export const threadConfig: IModelConfig<IThread, IThreadDto, IThreadFilter> = {
  collectionName: "threads",
  toDTO: toDto,
  buildPipeline: buildPipeline,
};
