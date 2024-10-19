import { IArticle } from "../models/article.model";
import { apiClientService } from "./api.client";

const create = async (article: IArticle): Promise<IArticle | undefined> => {
  try {
    const savedArticle = await apiClientService.post<IArticle>(
      "articles",
      article
    );
    return savedArticle;
  } catch (error) {
    console.error("error:", error);
  }
};

export const articleClientService = {
  create,
};
