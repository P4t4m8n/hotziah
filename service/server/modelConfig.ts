import { IModelConfig } from "../models/server.model";
import { IDto, IFilter } from "../models/app.model";
import { TModelCollectionName } from "../models/db.model";
import { questionnaireConfig } from "../services/questionnaire.service";
import { therapistConfig } from "../services/therapist.service";
import { userConfig } from "../services/user.service";
import { articleConfig } from "../services/article.service";
import { postConfig } from "../services/post.service";
import { threadConfig } from "../services/thread.service";
import { forumConfig } from "./util/forum.server.util";

const modelConfigs: Record<
  TModelCollectionName,
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
