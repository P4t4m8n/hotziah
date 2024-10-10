// modelConfig.ts

import { ModelConfig } from "../models/server.model";
import { IDto, IFilter } from "../models/app.model";
import { TCollectionName } from "../models/db.model";
import { articleConfig } from "./article.server";
import { questionnaireConfig } from "./questionnaire.server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modelConfigs: Record<TCollectionName, ModelConfig<any, IDto, IFilter>> = {
  questionnaire: questionnaireConfig,
  articles: articleConfig,
  therapists: articleConfig,
  users: articleConfig,
  forms: articleConfig,
  discussions: articleConfig,
};

export default modelConfigs;
