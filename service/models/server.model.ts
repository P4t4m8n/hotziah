import { IPipelineStage, TCollectionName } from "./db.model";

export interface IModelConfig<T, DTO, Filter> {
  collectionName: TCollectionName;
  toDTO: (entity: T) => DTO;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildPipeline: (filter: Filter) => any[];
  buildPipelineDetailed?: (filter: Filter) => IPipelineStage[];
}
