"use server";

import { IArticle, IArticleDto, IArticleFilter } from "../models/article.model";
import { getCollection } from "../db/mongo";
import { ObjectId } from "mongodb";
import { articleService } from "../services/article.service";
import { handleError } from "../util/error.util";

export const saveArticle = async (article: IArticle): Promise<IArticle> => {
  try {
    const articleDto = articleService.toDTO(article);
    let savedDto: IArticleDto;
    if (article._id) {
      savedDto = await _updateArticle(articleDto);
    } else {
      savedDto = await _createArticle(articleDto);
    }
    return { ...article, _id: savedDto._id!.toString() };
  } catch (error) {
    throw handleError(error, "Error saving article");
  }
};

export const getArticle = async (_id: string): Promise<IArticle> => {
  try {
    const collection = await getCollection("articles");
    const pipeline = articleService.buildPipeline({ _id });
    const [article] = await collection.aggregate<IArticle>(pipeline).toArray();
    if (!article || !article._id) {
      throw new Error("Article not found");
    }

    return { ...article, _id: article._id.toString() };
  } catch (error) {
    throw handleError(error, "Error getting article by id");
  }
};

export const getArticles = async (
  filter: IArticleFilter
): Promise<IArticle[]> => {
  try {
    const collection = await getCollection("articles");
    const pipeline = articleService.buildPipeline(filter);
    const articles = await collection.aggregate<IArticle>(pipeline).toArray();
    return articles.map((article) => {
      if (!article._id) {
        throw new Error("Article not found");
      }
      return { ...article, _id: article._id.toString() };
    });
  } catch (error) {
    throw handleError(error, "Error getting articles");
  }
};

export const deleteArticle = async (_id: string): Promise<void> => {
  try {
    const collection = await getCollection("articles");
    await collection.deleteOne({ _id: new ObjectId(_id) });
  } catch (error) {
    throw handleError(error, "Error deleting article");
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
