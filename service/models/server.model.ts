import { Document } from "mongodb";
import { IPipelineStage, TCollectionName } from "./db.model";

export interface IModelConfig<T extends Document, DTO, Filter> {
  collectionName: TCollectionName;
  toDTO: (entity: T) => DTO;
  buildPipeline: (filter: Filter) => IPipelineStage[];
  buildPipelineDetailed?: (filter: Filter) => IPipelineStage[];
}
