import { IModelConfig } from "../models/server.model";
import { IDto, IFilter } from "../models/app.model";
import { TCollectionName } from "../models/db.model";
import { articleConfig } from "./article.server";
import { questionnaireConfig } from "./questionnaire.server";
import { therapistConfig } from "./therapist.server";
import { userConfig } from "./user.model";
import { forumConfig } from "./forum.model";
import { postConfig } from "./post.server";
import { threadConfig } from "./thread.model";

const modelConfigs: Record<
  TCollectionName,
  IModelConfig<never, IDto, IFilter>
> = {
  questionnaires: questionnaireConfig,
  therapists: therapistConfig,
  users: userConfig,
  forums: forumConfig,
  articles: articleConfig,
  posts: postConfig,
  threads: threadConfig,
};

export default modelConfigs;
