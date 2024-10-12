import { IArticle } from "../models/article.model";
import { apiClientService } from "../util/apiClient.service";

const create = async (article: IArticle): Promise<IArticle | undefined> => {
  try {
    const savedArticle = await apiClientService.post<IArticle>(
      "articles",
      article
    );
    return savedArticle;
  } catch (error) {
    console.log("error:", error);
  }
};

export const articleClientService = {
  create,
};
