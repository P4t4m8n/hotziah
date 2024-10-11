"user server";

import { ObjectId } from "mongodb";
import { IPost, IPostDto, IPostFilter } from "../models/posts.model";
import { IModelConfig } from "../models/server.model";

const _toDto = (post: IPost): IPostDto => {
  const { _id, threadId, author, ...rest } = post;
  return {
    ...rest,
    _id: new ObjectId(_id),
    threadId: new ObjectId(threadId),
    authorId: new ObjectId(author._id),
  };
};

const _buildPipeline = (filter: IPostFilter) => {
  const pipeline = [];

  if (filter.content) {
    pipeline.push({ $regex: { content: filter.content } });
  }

  if (filter._id) {
    pipeline.push({ $match: { _id: new ObjectId(filter._id) } });
  }

  if (filter.authorName) {
    pipeline.push({
      $lookup: {
        from: "users",
        localField: "authorId",
        foreignField: "_id",
        as: "author",
      },
    });
    pipeline.push({ $regex: { "author.username": filter.authorName } });
  }

  const authorPipeline = [
    {
      $lookup: {
        from: "users",
        localField: "authorId",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: true,
      },
    },
  ];

  const project = {
    $project: {
      _id: { $toString: "$_id" },
      content: 1,
      threadId: { $toString: "$threadId" },
      author: {
        _id: { $toString: "$author._id" },
        username: "$author.username",
        imgUrl: "$author.imgUrl",
      },
    },
  };

  pipeline.push(authorPipeline);
  pipeline.push(project);

  return pipeline;
};

export const postConfig: IModelConfig<IPost, IPostDto, IPostFilter> = {
  collectionName: "posts",
  toDTO: _toDto,
  buildPipeline: _buildPipeline,
};
