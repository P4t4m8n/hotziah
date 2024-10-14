import { ObjectId } from "mongodb";
import { IForum, IForumDto, IForumFilter } from "../../models/forum.model";
import { IModelConfig } from "../../models/server.model";
import { IPipelineStage } from "../../models/db.model";

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

  pipeline.push({
    $addFields: {
      numOfThreads: { $size: "$threads" },
      threads: {
        $cond: {
          if: { $gt: [{ $size: "$threads" }, 0] },
          then: "$threads",
          else: null,
        },
      },
    },
  });

  pipeline.push({ $unwind: { path: "$threads", preserveNullAndEmptyArrays: true } });

  pipeline.push({
    $lookup: {
      from: "posts",
      let: { threadId: "$threads._id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$parentId", "$$threadId"] } } },
        { $sort: { createdAt: -1 } },
        { $limit: 1 },
      ],
      as: "latestPost",
    },
  });

  pipeline.push({
    $lookup: {
      from: "users",
      localField: "threads.authorId",
      foreignField: "_id",
      as: "threadAuthor",
    },
  });

  pipeline.push({
    $lookup: {
      from: "users",
      localField: "latestPost.authorId",
      foreignField: "_id",
      as: "postAuthor",
    },
  });

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
              },
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

  pipeline.push({
    $sort: { "threads.posts.createdAt": -1 },
  });

  pipeline.push({
    $group: {
      _id: "$_id",
      name: { $first: "$name" },
      description: { $first: "$description" },
      type: { $first: "$type" },
      admins: { $first: "$admins" },
      latestThread: { $first: "$threads" },
      numOfThreads: { $first: "$numOfThreads" },
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

  // Match by forum name or ID
  if (filter.name) {
    pipeline.push({ $match: { name: { $regex: filter.name, $options: "i" } } });
  }

  if (filter._id) {
    pipeline.push({ $match: { _id: new ObjectId(filter._id) } });
  }

  // Lookup for threads in the forum
  pipeline.push({
    $lookup: {
      from: "threads",
      localField: "_id",
      foreignField: "forumId",
      as: "threads",
    },
  });

  // Unwind threads to deal with them individually
  pipeline.push({
    $unwind: "$threads",
  });

  // Lookup for posts for each thread
  pipeline.push({
    $lookup: {
      from: "posts",
      localField: "threads._id",
      foreignField: "parentId", // Assuming parentId refers to the thread's _id in posts
      as: "posts",
    },
  });

  // Add numOfPosts for each thread (same logic as numOfThreads in buildPipeline)
  pipeline.push({
    $addFields: {
      "threads.numOfPosts": { $size: "$posts" }, // Count the number of posts in each thread
    },
  });

  // Lookup the latest post for each thread
  pipeline.push({
    $lookup: {
      from: "posts",
      let: { threadId: "$threads._id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$parentId", "$$threadId"] } } },
        { $sort: { createdAt: -1 } }, // Sort by createdAt to get the latest post
        { $limit: 1 }, // Limit to the most recent post
      ],
      as: "latestPost",
    },
  });

  // Lookup the thread's author
  pipeline.push({
    $lookup: {
      from: "users",
      localField: "threads.authorId",
      foreignField: "_id",
      as: "threadAuthor",
    },
  });

  // Lookup the latest post's author
  pipeline.push({
    $lookup: {
      from: "users",
      localField: "latestPost.authorId",
      foreignField: "_id",
      as: "postAuthor",
    },
  });

  // Add fields for the latest post, thread author, and necessary details
  pipeline.push({
    $addFields: {
      "threads.posts": {
        $cond: {
          if: { $gt: [{ $size: "$latestPost" }, 0] },
          then: [
            {
              _id: { $toString: { $arrayElemAt: ["$latestPost._id", 0] } }, // Post ID as string
              parentId: {
                $toString: { $arrayElemAt: ["$latestPost.parentId", 0] },
              }, // Post parentId as string
              content: { $arrayElemAt: ["$latestPost.content", 0] },
              createdAt: { $arrayElemAt: ["$latestPost.createdAt", 0] },
              author: {
                _id: { $toString: { $arrayElemAt: ["$postAuthor._id", 0] } }, // Post author ID as string
                username: { $arrayElemAt: ["$postAuthor.username", 0] },
                imgUrl: { $arrayElemAt: ["$postAuthor.imgUrl", 0] },
              },
              createdDateFromId: {
                $toDate: { $arrayElemAt: ["$latestPost._id", 0] },
              },
            },
          ],
          else: [],
        },
      },
      "threads.author": {
        _id: { $toString: { $arrayElemAt: ["$threadAuthor._id", 0] } }, // Thread author ID as string
        username: { $arrayElemAt: ["$threadAuthor.username", 0] },
        imgUrl: { $arrayElemAt: ["$threadAuthor.imgUrl", 0] },
      },
    },
  });

  // Convert thread _id to string (just like in buildPipeline)
  pipeline.push({
    $addFields: {
      "threads._id": { $toString: "$threads._id" }, // Convert thread _id to string
      "threads.forumId": { $toString: "$threads.forumId" }, // Convert forumId to string
    },
  });

  // Group the threads back into the forum
  pipeline.push({
    $group: {
      _id: "$_id",
      name: { $first: "$name" },
      description: { $first: "$description" },
      type: { $first: "$type" },
      admins: { $first: "$admins" },
      threads: { $push: "$threads" },
    },
  });

  // Lookup for admins
  pipeline.push({
    $lookup: {
      from: "users",
      localField: "admins",
      foreignField: "_id",
      as: "admins",
    },
  });

  // Add necessary fields for admins
  pipeline.push({
    $addFields: {
      admins: {
        $map: {
          input: "$admins",
          as: "admin",
          in: {
            _id: { $toString: "$$admin._id" }, // Convert admin _id to string
            username: "$$admin.username",
            imgUrl: "$$admin.imgUrl",
          },
        },
      },
    },
  });

  // Project only the necessary fields
  pipeline.push({
    $project: {
      _id: { $toString: "$_id" }, // Convert forum _id to string
      name: 1,
      description: 1,
      type: 1,
      admins: 1,
      threads: {
        _id: 1, // Thread _id as string
        forumId: 1, // ForumId as string
        name: 1,
        author: 1,
        posts: 1,
        numOfPosts: 1, // Include numOfPosts in the output
      },
    },
  });

  return pipeline;
};

const getEmptyForum = (): IForum => {
  return {
    _id: "",
    name: "",
    description: "",
    type: "public",
    admins: [],
  };
};

export const forumConfig: IModelConfig<IForum, IForumDto, IForumFilter> = {
  collectionName: "forums",
  toDTO: toDto,
  buildPipeline,
  buildPipelineDetailed,
};

export const forumServerService = {
  toDto,
  buildPipeline,
  buildPipelineDetailed,
  getEmptyForum,
};
