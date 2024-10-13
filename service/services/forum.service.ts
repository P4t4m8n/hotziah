import { ObjectId } from "mongodb";
import { IForum, IForumDto, IForumFilter } from "../models/forum.model";
import { IModelConfig } from "../models/server.model";
import { IPipelineStage } from "../models/db.model";

const toDto = (forum: IForum): IForumDto => {
  const { _id, admins, ...rest } = forum;
  return {
    ...rest,
    _id: new ObjectId(_id),
    admins: admins.map((admin) => new ObjectId(admin._id)),
  };
};

const buildPipeline = (filter: IForumFilter): IPipelineStage[] => {
  const pipeline: IPipelineStage[] = [];

  // Match forums by name or _id if provided in the filter
  if (filter.name) {
    pipeline.push({ $match: { name: { $regex: filter.name, $options: "i" } } });
  }

  if (filter._id) {
    pipeline.push({ $match: { _id: new ObjectId(filter._id) } });
  }

  // Lookup threads for the forum
  pipeline.push({
    $lookup: {
      from: "threads",
      localField: "_id",
      foreignField: "forumId",
      as: "threads",
    },
  });

  // Count the total number of threads in each forum
  pipeline.push({
    $addFields: {
      numOfThreads: { $size: "$threads" },
    },
  });

  // Unwind threads to process them individually
  pipeline.push({ $unwind: "$threads" });

  // Lookup the latest post for each thread
  pipeline.push({
    $lookup: {
      from: "posts",
      let: { threadId: "$threads._id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$parentId", "$$threadId"] } } },
        { $sort: { createdAt: -1 } }, // Sort by createdAt to get the latest post
        { $limit: 1 }, // Only take the latest post
      ],
      as: "latestPost",
    },
  });

  // Lookup the author for each thread
  pipeline.push({
    $lookup: {
      from: "users",
      localField: "threads.authorId",
      foreignField: "_id",
      as: "threadAuthor",
    },
  });

  // Lookup the author for the latest post
  pipeline.push({
    $lookup: {
      from: "users",
      localField: "latestPost.authorId",
      foreignField: "_id",
      as: "postAuthor",
    },
  });

  // Add the latest post data and the authors (thread and post)
  pipeline.push({
    $addFields: {
      "threads.posts": {
        $cond: {
          if: { $gt: [{ $size: "$latestPost" }, 0] },
          then: [
            {
              _id: { $toString: { $arrayElemAt: ["$latestPost._id", 0] } },
              parentId: {
                $toString: { $arrayElemAt: ["$latestPost.parentId", 0] },
              },
              content: { $arrayElemAt: ["$latestPost.content", 0] },
              createdAt: { $arrayElemAt: ["$latestPost.createdAt", 0] },
              author: {
                _id: { $toString: { $arrayElemAt: ["$postAuthor._id", 0] } },
                username: { $arrayElemAt: ["$postAuthor.username", 0] },
                imgUrl: { $arrayElemAt: ["$postAuthor.imgUrl", 0] },
              },
              createdDateFromId: {
                $toDate: { $arrayElemAt: ["$latestPost._id", 0] },
              }, // Add post creation date from ObjectId
            },
          ],
          else: [],
        },
      },
      "threads.author": {
        _id: { $toString: { $arrayElemAt: ["$threadAuthor._id", 0] } },
        username: { $arrayElemAt: ["$threadAuthor.username", 0] },
        imgUrl: { $arrayElemAt: ["$threadAuthor.imgUrl", 0] },
      },
    },
  });

  // Sort threads by latest post's creation date
  pipeline.push({
    $sort: { "threads.posts.createdAt": -1 },
  });

  // Group by forum and take only the latest thread
  pipeline.push({
    $group: {
      _id: "$_id",
      name: { $first: "$name" },
      description: { $first: "$description" },
      type: { $first: "$type" },
      admins: { $first: "$admins" },
      latestThread: { $first: "$threads" }, // Keep only the latest thread
      numOfThreads: { $first: "$numOfThreads" },
    },
  });

  // Lookup admins from the 'users' collection based on the array of ObjectIDs in 'admins'
  pipeline.push({
    $lookup: {
      from: "users",
      localField: "admins",
      foreignField: "_id",
      as: "admins",
    },
  });

  // Convert ObjectId fields to strings and ensure admins are populated
  pipeline.push({
    $addFields: {
      "latestThread._id": { $toString: "$latestThread._id" },
      "latestThread.forumId": { $toString: "$latestThread.forumId" },
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
  });

  // Final projection to match the IForumDetails structure
  pipeline.push({
    $project: {
      _id: { $toString: "$_id" },
      name: 1,
      description: 1,
      type: 1,
      admins: 1,
      threads: [
        {
          _id: "$latestThread._id",
          forumId: "$latestThread.forumId",
          name: "$latestThread.name",
          author: "$latestThread.author",
          posts: "$latestThread.posts",
        },
      ],
      numOfThreads: 1,
    },
  });

  return pipeline;
};

const buildPipelineDetailed = (filter: IForumFilter) => {
  const pipeline: IPipelineStage[] = [];

  if (filter.name) {
    pipeline.push({ $match: { name: { $regex: filter.name, $options: "i" } } });
  }

  if (filter._id) {
    pipeline.push({ $match: { _id: new ObjectId(filter._id) } });
  }

  pipeline.push({
    $lookup: {
      from: "threads",
      localField: "_id",
      foreignField: "forumId",
      as: "threads",
    },
  });

  if (filter.threadName) {
    pipeline.push({
      $match: { "threads.name": { $regex: filter.threadName, $options: "i" } },
    });
  }

  // Lookup posts to count them for each thread
  pipeline.push({
    $lookup: {
      from: "posts",
      localField: "threads._id",
      foreignField: "parentId",
      as: "posts",
    },
  });

  // Add numOfPosts for each thread
  pipeline.push({
    $addFields: {
      threads: {
        $map: {
          input: "$threads",
          as: "thread",
          in: {
            _id: { $toString: "$$thread._id" },
            name: "$$thread.name",
            numOfPosts: {
              $size: {
                $filter: {
                  input: "$posts",
                  as: "post",
                  cond: { $eq: ["$$post.parentId", "$$thread._id"] },
                },
              },
            },
          },
        },
      },
    },
  });

  pipeline.push({
    $lookup: {
      from: "users",
      localField: "admins",
      foreignField: "_id",
      as: "admins",
    },
  });

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
      threads: 1,
    },
  };

  pipeline.push(project);

  return pipeline;
};

export const forumConfig: IModelConfig<IForum, IForumDto, IForumFilter> = {
  collectionName: "forums",
  toDTO: toDto,
  buildPipeline,
  buildPipelineDetailed,
};
