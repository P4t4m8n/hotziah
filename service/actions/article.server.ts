"use server";

import { IArticle } from "../models/article.model";
import { getCollection } from "../db/mongo";
import { ObjectId } from "mongodb";

export const saveArticle = async (article: IArticle): Promise<IArticle> => {
  try {
    const collection = await getCollection("articles");
    if (article._id) {
      const { matchedCount } = await collection.updateOne(
        { _id: new ObjectId(article._id) },
        { $set: article }
      );

      if (matchedCount === 0) {
        throw new Error("Article not found");
      }

      return { ...article, _id: article.id.toString() };
    }

    const result = await collection.insertOne({
      article
    
    });
    return { ...article, id: result.insertedId.toString() };
  } catch (error) {
    throw new Error(
      `Error saving article: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

export const getArticle = async (id: string): Promise<IArticle> => {
  try {
    const collection = await getCollection("articles");
    const article = await collection.findOne<IArticle>({
      _id: new ObjectId(id),
    });
    if (!article || !article._id) {
      throw new Error("Article not found");
    }

    return { ...article, _id: article._id.toString() };
  } catch (error) {
    throw new Error(
      `Error getting article: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};
