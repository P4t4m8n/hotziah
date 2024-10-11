"user server";

import { ObjectId } from "mongodb";
import { IForum, IForumDto, IForumFilter } from "../models/forum.model";
import { IModelConfig } from "../models/server.model";

const _toDto = (forum: IForum): IForumDto => {
  const { _id, admins, ...rest } = forum;
  return {
    ...rest,
    _id: new ObjectId(_id),
    admins: admins.map((admin) => new ObjectId(admin._id)),
  };
};

const _buildPipeline = (filter: IForumFilter) => {
  const pipeline = [];

  if (filter.name) {
    pipeline.push({ $regex: { name: filter.name } });
  }

  if (filter._id) {
    pipeline.push({ $match: { _id: new ObjectId(filter._id) } });
  }

  if (filter.postName) {
    pipeline.push({
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "forumId",
        as: "posts",
      },
    });
    pipeline.push({ $regex: { "posts.name": filter.postName } });
  }

  if (filter.threadName) {
    pipeline.push({
      $lookup: {
        from: "threads",
        localField: "_id",
        foreignField: "forumId",
        as: "threads",
      },
    });
    pipeline.push({ $regex: { "threads.name": filter.threadName } });
  }

  const project = {
    $project: {
      _id: { $toString: "$_id" },
      name: 1,
      description: 1,
      admins: {
        $map: {
          input: "$admins",
          as: "admin",
          in: {
            _id: { $toString: "$$admin._id" },
            username: "$$admin.username",
            imgUrl: "$$admin.imgUrl",
          },
        },
      },
    },
  };

  pipeline.push(project);

  return pipeline;
};

export const forumConfig: IModelConfig<IForum, IForumDto, IForumFilter> = {
  collectionName: "forums",
  toDTO: _toDto,
  buildPipeline: _buildPipeline,
};
