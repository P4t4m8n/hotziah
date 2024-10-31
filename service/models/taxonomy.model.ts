import { IEntity } from "./app.model";

export interface ITaxonomy extends IEntity {
  name: TTaxonomyName | string;
  enums: string[];
}
