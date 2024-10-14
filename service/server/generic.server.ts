"use server";

import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../db/mongo";
import modelConfigs from "./modelConfig";
import { TModelCollectionName } from "../models/db.model";
import { IModelConfig } from "../models/server.model";
import { IDto, IFilter } from "../models/app.model";
import { handleError } from "../util/error.util";

export const saveEntity = async <T extends Document, DTO extends IDto>(
  entity: T,
  key: TModelCollectionName
): Promise<T> => {
  try {
    const config = modelConfigs[key] as IModelConfig<T, DTO, IFilter>;
    if (!config) throw new Error(`No model config found for key ${key}`);

    const collection = await getCollection(config.collectionName);
    const dto = config.toDTO(entity);

    let savedDto: DTO;
    const entityId = (entity as T)._id;
    if (entityId) {
      savedDto = await _updateEntity(collection, dto);
    } else {
      savedDto = await _createEntity(collection, dto);
    }
    return { ...entity, _id: savedDto._id!.toString() };
  } catch (error) {
    throw handleError(error, `Error saving entity of type ${key}`);
  }
};
export const saveEntityDto = async <
  T extends { _id?: string },
  DTO extends IDto
>(
  entity: DTO,
  key: TModelCollectionName
): Promise<T> => {
  try {
    const config = modelConfigs[key] as IModelConfig<T, DTO, IFilter>;
    if (!config) throw new Error(`No model config found for key ${key}`);

    const collection = await getCollection(config.collectionName);

    let savedEntity: DTO;
    const entityId = entity._id;
    if (entityId) {
      savedEntity = await _updateEntity(collection, entity);
    } else {
      savedEntity = await _createEntity(collection, entity);
    }
    return { ...entity, _id: savedEntity._id!.toString() } as unknown as T;
  } catch (error) {
    throw handleError(error, `Error saving entity of type ${key}`);
  }
};

export const getEntity = async <T extends Document, Filter extends IFilter>(
  filter: Filter,
  key: TModelCollectionName
): Promise<T> => {
  try {
    const config = modelConfigs[key] as IModelConfig<T, never, IFilter>;
    if (!config) throw new Error(`No model config found for key ${key}`);

    const pipeline = config.buildPipeline(filter);
    const collection = await getCollection(config.collectionName);
    const [entity] = await collection.aggregate<T>(pipeline).toArray();

    if (!entity || !entity._id) {
      throw new Error("Entity not found");
    }

    return entity;
  } catch (error) {
    throw handleError(error, `Error getting entity by ID of type ${key}`);
  }
};

export const getEntityDetailed = async <T extends Document, Filter>(
  filter: Filter,
  key: TModelCollectionName
): Promise<T> => {
  try {
    const config = modelConfigs[key] as unknown as IModelConfig<
      T,
      never,
      Filter
    >;
    if (!config) throw new Error(`No model config found for key ${key}`);

    const pipeline = config.buildPipelineDetailed!(filter);

    const collection = await getCollection(config.collectionName);
    const [entity] = await collection.aggregate<T>(pipeline).toArray();

    if (!entity || !entity._id) {
      throw new Error("Entity not found");
    }

    return entity;
  } catch (error) {
    throw handleError(error, `Error getting entity by ID of type ${key}`);
  }
};

export const getEntities = async <T extends Document, Filter>(
  filter: Filter,
  key: TModelCollectionName
): Promise<T[]> => {
  try {
    const config = modelConfigs[key] as unknown as IModelConfig<
      T,
      unknown,
      Filter
    >;
    if (!config) throw new Error(`No model config found for key ${key}`);

    const pipeline = config.buildPipeline(filter);
    const collection = await getCollection(config.collectionName);
    const entities = await collection.aggregate<T>(pipeline).toArray();

    return entities;
  } catch (error) {
    throw handleError(error, `Error getting entities of type ${key}`);
  }
};

export const removeEntity = async (
  _id: string,
  key: TModelCollectionName
): Promise<void> => {
  try {
    const config = modelConfigs[key];
    if (!config) throw new Error(`No model config found for key ${key}`);

    const collection = await getCollection(config.collectionName);
    const { deletedCount } = await collection.deleteOne({
      _id: new ObjectId(_id),
    });
    if (deletedCount === 0) {
      throw new Error("Entity not found");
    }
  } catch (error) {
    throw handleError(error, `Error removing entity of type ${key}`);
  }
};

//Private functions
const _createEntity = async <DTO extends IDto>(
  collection: Collection,
  dto: DTO
): Promise<DTO> => {
  const { insertedId } = await collection.insertOne(dto);
  if (!insertedId) {
    throw new Error("Entity not created");
  }
  return { ...dto, _id: insertedId } as DTO;
};

const _updateEntity = async <DTO extends IDto>(
  collection: Collection,
  dto: IDto
): Promise<DTO> => {
  const objectId = new ObjectId(dto._id);
  const { upsertedId } = await collection.updateOne(
    { _id: objectId },
    { $set: dto }
  );
  if (!upsertedId) {
    throw new Error("Entity not found");
  }
  return { ...dto, _id: upsertedId } as DTO;
};
