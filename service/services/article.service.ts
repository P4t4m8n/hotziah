import { ObjectId } from "mongodb";
import { IArticle, IArticleDto, IArticleFilter } from "../models/article.model";
import { IModelConfig } from "../models/server.model";

const buildPipeline = (filter: IArticleFilter) => {
  const pipeline = [];
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
    pipeline.push({
      $match: { "author.name": filter.authorName },
    });
  }

  if (filter.createdAfter) {
    pipeline.push({
      $match: { createdAt: { $gte: filter.createdAfter } },
    });
  }

  if (filter.title) {
    pipeline.push({ $match: { title: filter.title } });
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
      subjects: 1,
      title: 1,
      description: 1,
      question: 1,
      author: {
        _id: { $toString: "$author._id" },
        username: "$author.username",
        imgUrl: "$author.imgUrl",
      },
    },
  };

  pipeline.push(...authorPipeline);
  pipeline.push(project);
  return pipeline;
};

const toDTO = (article: IArticle): IArticleDto => {
  const { _id, author, ...articleDto } = article;
  return {
    ...articleDto,
    _id: new ObjectId(_id),
    authorId: new ObjectId(author._id),
  };
};



export const articleConfig: IModelConfig<
  IArticle,
  IArticleDto,
  IArticleFilter
> = {
  collectionName: "articles",
  toDTO: toDTO,
  buildPipeline: buildPipeline,
};

export const articleService = {
  buildPipeline,
  toDTO,
};
