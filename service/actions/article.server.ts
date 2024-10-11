"use server";

import { IArticle, IArticleDto, IArticleFilter } from "../models/article.model";
import { getCollection } from "../db/mongo";
import { ObjectId } from "mongodb";
import { loggerService } from "../util/logger.util";
import { IModelConfig } from "../models/server.model";

export const saveArticle = async (article: IArticle): Promise<IArticle> => {
  try {
    const articleDto = _toDTO(article);
    let savedDto: IArticleDto;
    if (article._id) {
      savedDto = await _updateArticle(articleDto);
    } else {
      savedDto = await _createArticle(articleDto);
    }
    return { ...article, _id: savedDto._id!.toString() };
  } catch (error) {
    throw _handleError(error, "Error saving article");
  }
};

export const getArticle = async (_id: string): Promise<IArticle> => {
  try {
    const collection = await getCollection("articles");
    const pipeline = _buildPipeline({ _id });
    const [article] = await collection.aggregate<IArticle>(pipeline).toArray();
    if (!article || !article._id) {
      throw new Error("Article not found");
    }

    return { ...article, _id: article._id.toString() };
  } catch (error) {
    throw _handleError(error, "Error getting article by id");
  }
};

export const getArticles = async (
  filter: IArticleFilter
): Promise<IArticle[]> => {
  try {
    const collection = await getCollection("articles");
    const pipeline = _buildPipeline(filter);
    const articles = await collection.aggregate<IArticle>(pipeline).toArray();
    return articles.map((article) => {
      if (!article._id) {
        throw new Error("Article not found");
      }
      return { ...article, _id: article._id.toString() };
    });
  } catch (error) {
    throw _handleError(error, "Error getting articles");
  }
};

export const deleteArticle = async (_id: string): Promise<void> => {
  try {
    const collection = await getCollection("articles");
    await collection.deleteOne({ _id: new ObjectId(_id) });
  } catch (error) {
    throw _handleError(error, "Error deleting article");
  }
};

//Private functions

const _createArticle = async (article: IArticleDto) => {
  const collection = await getCollection("articles");
  const { insertedId } = await collection.insertOne(article);
  return { ...article, _id: insertedId };
};

const _updateArticle = async (article: IArticleDto) => {
  const collection = await getCollection("articles");
  const { upsertedId } = await collection.updateOne(
    { _id: article._id },
    { $set: article }
  );

  if (!upsertedId) {
    throw new Error("Article not found");
  }

  return { ...article, _id: upsertedId };
};

const _buildPipeline = (filter: IArticleFilter) => {
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

const _toDTO = (article: IArticle): IArticleDto => {
  const { _id, author, ...articleDto } = article;
  return {
    ...articleDto,
    _id: new ObjectId(_id),
    authorId: new ObjectId(author._id),
  };
};

const _handleError = (error: unknown, errorStr: string) => {
  loggerService.error(errorStr, error as Error);
  return new Error(
    `Error saving questionnaire: ${
      error instanceof Error ? error.message : String(error)
    }`
  );
};

export const articleConfig: IModelConfig<
  IArticle,
  IArticleDto,
  IArticleFilter
> = {
  collectionName: "articles",
  toDTO: _toDTO,
  buildPipeline: _buildPipeline,
};
